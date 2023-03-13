import { valida } from "./validaciones.js";

const inputs = document.querySelectorAll("input"); // me trae todos los input y me regresa un arreglo

inputs.forEach(input =>{ // itero sobre el arreglo
    input.addEventListener("blur", (input)=>{  // le agrega a cada input el addEventListener
        valida(input.target); // llama a valida y le pasa cada input
    });
    
});