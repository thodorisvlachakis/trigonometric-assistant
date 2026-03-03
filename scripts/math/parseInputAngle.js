const validPIValues = ["π", "pi", "Pi", "pI", "PI"];
const dividedPIValues = ["π/", "pi/", "Pi/", "pI/", "PI/"];

export function managePiInput(input) {
    // "input" parameter must be a string
     
    if (validPIValues.includes(input)) {
        
        input = Math.PI;

        return {isNumber: true, value: input};

    } else if (input.length > 1 && input.slice(-1) === "π") {
        
        let coeff;
        if (input.charAt(0) === "-") {
            
            if(input.length > 2) {

                coeff = -Number(input.slice(1, -1));
            } else {
                
                coeff = -1;
            }            

        } else {
            
            coeff = Number(input.slice(0, -1));
        }

        if (!isNaN(coeff)) {
            
            input = coeff * Math.PI;            

            return {isNumber: true, value: input};
        }

    } else if (input.length > 1 && validPIValues.slice(1, validPIValues.length).includes(input.slice(-2))) {
        
        let coeff;

        if (input.charAt(0) === "-") {
            if (input.length > 3) {

                coeff = -Number(input.slice(1, -2));
            } else {

                coeff = -1;
            }

        } else {

            coeff = Number(input.slice(0, -2));
        }

        if (!isNaN(coeff)) {
            
            input = coeff * Math.PI;

            return {isNumber: true, value: input};
        }

    } else if (input.length > 2 && dividedPIValues.some( substring => input.includes(substring) )) {
        
        const foundSubstr = dividedPIValues.find( substring => input.includes(substring) );

        input = input.replace(foundSubstr, 'Found Here');
        
        const lastIndexOfSubstr = input.indexOf("Found Here");
        const leftSubstr = input.slice(0,lastIndexOfSubstr);
        const rightSubstr = input.slice(lastIndexOfSubstr + 10, input.length);

        if (!isNaN(Number(rightSubstr)) && Number(rightSubstr) !== 0) {

            if (leftSubstr === '') {

                let coeff = 1 / Number(rightSubstr);
                input = coeff * Math.PI;

                return {isNumber: true, value: input};
            
            } else if (leftSubstr === "-") {
                
                let coeff = -1 / Number(rightSubstr);
                input = coeff * Math.PI;
                
                return {isNumber: true, value: input};          
            
            } else if (!isNaN(Number(leftSubstr))) {             
                
                let coeff = Number(leftSubstr) / Number(rightSubstr);
                input = coeff * Math.PI;
                
                return {isNumber: true, value: input};
            }
        }
    }

    return {isNumber: false, value: input};
}
