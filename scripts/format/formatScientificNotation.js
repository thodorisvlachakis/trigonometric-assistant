const numericalSuperscripts = {
    "0": "\u2070",
    "1": "\u2071",
    "2": "\u00b2",
    "3": "\u00b3",
    "4": "\u2074",
    "5": "\u2075",
    "6": "\u2076",
    "7": "\u2077",
    "8": "\u2078",
    "9": "\u2079",
    "-": "\u207b"
};

export function formatScientificNotationRepresentation(outputStr) {
    // This function takes as input the string to be given as output value and checks whether
    // the numeric result that has been converted to that string contains exponential format.
    // If that's true, the function manages this output string using Unicode superscripts in
    // order to transform the output string into a more UX-friendly format.
    // The "outputStr" parameter must be a String.
    
    const expStartingPointIdx = outputStr.indexOf("e");

    if(expStartingPointIdx !== -1){

        const leftSubstr = outputStr.slice(0, expStartingPointIdx);
        let rightSubstr = outputStr.slice(expStartingPointIdx + 1);
        
        // rightSubstr = Array.from(rightSubstr).map((char) => {
        //     char = Object.hasOwn(numericalSuperscripts, char) ? numericalSuperscripts[char] : char
        // });

        // // Transorm rigthSubstr back into String
        // rightSubstr = String(rightSubstr).replaceAll(',', '');
        
        rightSubstr = rightSubstr.split("").map( charElement => numericalSuperscripts[charElement] || charElement ).join("");

        return (leftSubstr + "×" + "10" + rightSubstr);
    }

    return outputStr;
}
