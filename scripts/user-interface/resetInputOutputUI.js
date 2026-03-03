export function reset(input, outputs) {
    
    if (input) {
        input.value = "";
        input.classList.remove("input-error");
    }

    for (let output of outputs){
        output.value = "Result";
        output.classList.remove("successfullyCalculated")
    }
}
