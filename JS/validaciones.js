export function valida(input){ // recibe el input
    const tipoDeInput = input.dataset.tipo; // dataset es el conjunto de datas, y le pido que me traiga el que dice tipo
    if(validadores[tipoDeInput]){ // verifico si existe el tipo de input
        validadores[tipoDeInput](input); // si esta le paso validdores y le paso el input que recibimos
    }

    if(input.validity.valid){// Verificamos el estado de la propiedaad valid si esta en true remueve la clase si esta en false la agrega
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "" //ponemos la clase como vacia cuando no haya error
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input); // si esta clase muestra el error
    }
}

const tipoDeErrores = [ //Creamos arreglo con los tipo de errores
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
]; 

const mensajesDeError = { //Creamos objeto con todos los msns de error
    nombre:{
        valueMissing: "El campo nombre no puede estar vacio"
        },
    correo:{
        valueMissing: "El campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido"
        },
    password:{
        valueMissing: "El campo contraseña no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, maximo 12, debe contener una letra minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales"
        },
    nacimiento:{
        valueMissing: "El campo fecha de nacimiento no puede estar vacio",
        customError: "Debes tener al menos 18 años de Edad"
        },
    numero:{
        valueMissing: "El campo número no puede estar vacio",
        patternMismatch: "El formato requerido es XXX-XXXXXXX 10 digitos"
    },
    direccion:{
        valueMissing: "El campo dirección no puede estar vacio",
        patternMismatch: "La dirección debe contener entre 10 y 40 caracteres"
    },
    ciudad:{
        valueMissing: "El campo ciudad no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 4 y 30 caracteres"
    },
    estado:{
        valueMissing: "El campo estado no puede estar vacio",
        patternMismatch: "El estado debe contener entre 4 y 30 caracteres"
    },
}

const validadores = { //ES un objeto de propiedad y nombre
    nacimiento: (input) => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = ""; // inicialmente esta vacio
    tipoDeErrores.forEach(error =>{ //Recorrenos la lista de errores para que saque cada error
        if(input.validity[error]){ //Si dentro del validity del input esta el error, entonces me imprima el mensaje 
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error]; // Accedemos al mns 
        }
    });
    return mensaje
}



function validarNacimiento(input){
    const fechaCliente =new Date(input.value) // trae la fecha que seleccionamos con un objeto de classe Date
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)){ //PAsamos la nueva funcion que nos dice si es mayor de edad
        mensaje = "Debes tener al menos 18 años de Edad";
    }
    input.setCustomValidity(mensaje);

}

function mayorDeEdad(fecha){
    const fechaActual = new Date(); //Trae automatico los parametros
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() +18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate());
    return diferenciaFechas <= fechaActual;
}