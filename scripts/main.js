import { deg2rad, rad2deg } from "./math/angleConverter.js";
import { calculateTrigFunctions } from "./math/trigonometry.js";
import { managePiInput } from "./math/parseInputAngle.js";
import { reset } from "./user-interface/resetInputOutputUI.js"
import { formatScientificNotationRepresentation } from "./format/formatScientificNotation.js"

const headerOfConverter = document.getElementById("headerOfConverter");
const angleConverterContainer = document.getElementById("angleConverterContainer");
const angleConverterInput = document.getElementById("angleConverterInput");
const angleInputUnitLabel = document.getElementById("angleInputUnitLabel");
const angleResult = document.getElementById("angleResult");
const angleResultUnitLabel = document.getElementById("angleResultUnitLabel");
const swapBtn = document.getElementById("swapBtn");
const convertBtnContainer = document.getElementById("convertBtnContainer");
const convertBtn = document.getElementById("convertBtn");
const angleInputTrigFunc = document.getElementById("angleInputTrigFunc");
const angleInputTrigFuncUnitLabel = document.getElementById("angleInputTrigFuncUnitLabel");
const switchAngleUnitBtn = document.getElementById("switchAngleUnitBtn");
const slidingField = document.querySelector(".slidingField");
const sinResult = document.getElementById("sin");
const cosResult = document.getElementById("cos");
const tanResult = document.getElementById("tan");
const cotResult = document.getElementById("cot");
const calculateTrigFuncBtn = document.getElementById("calculateTrigFuncBtn");
const trigonometricTable = document.getElementById("trigonometricTable");
const trigonometricTableDataCells = document.querySelectorAll("td"); // All the data cells of the Trigonometric Table
const trigonometricTableRowHeaders = document.querySelectorAll(".tableRowHeader"); // All the rows' headers of the Trigonometric Table
const trigonometricTableRows = trigonometricTable.rows; // Rows of the Trigonometric Table

let angleToConvert;
let convertedAngle;
let trigFuncResults;
let angle;

calculateTrigFuncBtn.addEventListener("click", () => {
    // console.log(trigonometricTableDataCells);
    angle = angleInputTrigFunc.value;

    if (angle) {

        // Firstly, check if an expression including mathematical "Pi" is given as input
        let {isNumber, value} = managePiInput(angle);
        
        if (!isNumber) {

            angle = Number(angle);

        } else {

            angle = value;
        }

        if (!isNaN(angle)) {
            // Input angle is a Number -> Happy Path

            if (angleInputTrigFuncUnitLabel.innerHTML === "[°]") {

                angle = deg2rad(angle);            
            }            

            trigFuncResults = calculateTrigFunctions(angle);

            sinResult.value = formatScientificNotationRepresentation(String(parseFloat(trigFuncResults.sin.toFixed(16))));
            cosResult.value = formatScientificNotationRepresentation(String(parseFloat(trigFuncResults.cos.toFixed(16))));
            tanResult.value = trigFuncResults.tan === Infinity
                    ? "∞" 
                    : formatScientificNotationRepresentation(String(parseFloat(trigFuncResults.tan.toFixed(16))));
            cotResult.value = trigFuncResults.cot === Infinity
                    ? "∞" 
                    : formatScientificNotationRepresentation(String(parseFloat(trigFuncResults.cot.toFixed(16))));

            sinResult.classList.add("successfullyCalculated");
            cosResult.classList.add("successfullyCalculated");
            tanResult.classList.add("successfullyCalculated");
            cotResult.classList.add("successfullyCalculated");

        } else {
            //Invalid input type

            reset(angleInputTrigFunc, [sinResult, cosResult, tanResult, cotResult]);
            angleInputTrigFunc.classList.add("input-error");
        }

    } else {

        angleInputTrigFunc.classList.add("input-error");
    }
});

angleInputTrigFunc.addEventListener("focus", () => {

    if (angleInputTrigFunc.classList.contains("input-error")) {
    
        reset(angleInputTrigFunc, []);
    }
});

angleInputTrigFunc.addEventListener("input", () => {

    if (angleInputTrigFunc.value.trim() === "") {
        
        reset(angleInputTrigFunc, [sinResult, cosResult, tanResult, cotResult]);
    }
});

swapBtn.addEventListener("click", () => {
    
    if (angleInputUnitLabel.innerHTML === "[°]"){
        // deg2rad Converter -> Swap to rad2deg Converter
        headerOfConverter.innerHTML = "Radians To Degree Converter";
        angleInputUnitLabel.innerHTML = "[rad]";
        angleResultUnitLabel.innerHTML = "[°]";

    } else {
        // rad2deg Converter -> Swap to deg2rad Converter
        headerOfConverter.innerHTML = "Degree To Radians Converter";
        angleInputUnitLabel.innerHTML = "[°]";
        angleResultUnitLabel.innerHTML = "[rad]";
    }

    reset(angleConverterInput, [angleResult]);
});

convertBtn.addEventListener("click", () => {

    angleToConvert = angleConverterInput.value;
    
    if (angleToConvert) {

        // Firstly, check if an expression including mathematical "Pi" is given as input
        let {isNumber, value} = managePiInput(angleToConvert);

        if (!isNumber) {

            angleToConvert = Number(angleToConvert);
        } else {

            angleToConvert = value;
        }
        
        if (!isNaN(angleToConvert)) {
            // Input is a Number -> Happy Path

            if(angleInputUnitLabel.innerHTML === "[°]"){

                convertedAngle = deg2rad(angleToConvert);
            
            } else {
                
                convertedAngle = rad2deg(angleToConvert);
            }

            convertedAngle = parseFloat(convertedAngle.toFixed(9))
            angleResult.value = formatScientificNotationRepresentation(String(convertedAngle));
            
            if (angleResult.value.length > 15) {
                angleResult.value = angleResult.value.slice(0,13) + "...";
            }
            
            angleResult.classList.add("successfullyCalculated");

        } else {
            // Invalid input type

            // angleConverterInput.value = "";
            reset(angleConverterInput, [angleResult]);
            angleConverterInput.classList.add("input-error");
        }

    } else {

        angleConverterInput.classList.add("input-error");
    }
});

angleConverterInput.addEventListener("focus", () => {

    if (angleConverterInput.classList.contains("input-error")) {
        
        reset(angleConverterInput, [angleResult]);
    }

    // angleConverterInput.classList.remove("input-error");
});

angleConverterInput.addEventListener("input", () => {

    if (angleConverterInput.value.trim() === ""){
        
        reset(angleConverterInput, [angleResult]);
    }
});

switchAngleUnitBtn.addEventListener("mouseenter", () => {

    slidingField.classList.add("btn-is-hovered");

    
    if (switchAngleUnitBtn.ariaPressed === "false") {
        // deg unit label is pressed
        slidingField.classList.add("animationDegPressed");
    
    } else {
        
        slidingField.classList.add("animationRadPressed");
    }
});

switchAngleUnitBtn.addEventListener("mouseleave", () => {

    slidingField.classList.remove("btn-is-hovered", "animationDegPressed", "animationRadPressed");
});

switchAngleUnitBtn.addEventListener("click", () => {

    slidingField.classList.toggle("toggled");
    
    switchAngleUnitBtn.ariaPressed = String(switchAngleUnitBtn.ariaPressed === "false")
    
    angleInputTrigFuncUnitLabel.innerHTML = switchAngleUnitBtn.ariaPressed === "true" ?
                angleInputTrigFuncUnitLabel.innerHTML = "[rad]" : 
                angleInputTrigFuncUnitLabel.innerHTML = "[°]";

    reset(angleInputTrigFunc, [sinResult, cosResult, tanResult, cotResult]);
});

trigonometricTableDataCells.forEach((element) => {
    
    element.addEventListener("mouseenter", () => {
        
        // const row = element.parentElement;
        const row = element.closest('tr');
        const rowHeader = row.firstElementChild;

        const column = element.cellIndex;
        const columnHeader = trigonometricTableRows[0].children[column];
        
        element.classList.add("is-highlighted");
        rowHeader.classList.add("is-highlighted");
        columnHeader.classList.add("is-highlighted");
    });

    element.addEventListener("mouseleave", () => {

        const row = element.closest('tr');
        const rowHeader = row.firstElementChild;

        const column = element.cellIndex;
        const columnHeader = trigonometricTableRows[0].children[column];

        element.classList.remove("is-highlighted");
        rowHeader.classList.remove("is-highlighted");
        columnHeader.classList.remove("is-highlighted");
    });
});

trigonometricTableRowHeaders.forEach((rowHeader) => {

    rowHeader.addEventListener("mouseenter", () => {

        const row = rowHeader.closest('tr');
        
        Array.from(row.children).forEach((child) => {

            child.classList.add("is-highlighted");
        });

        Array.from(trigonometricTableRows[0].children).forEach((child) => {
            
            child.classList.add("is-highlighted");
        });
    });

    rowHeader.addEventListener("mouseleave", () => {

        const row = rowHeader.closest('tr');
        Array.from(row.children).forEach((child) => {

            child.classList.remove("is-highlighted");
        });

        Array.from(trigonometricTableRows[0].children).forEach((child) => {
            
            child.classList.remove("is-highlighted");
        });
    });
});
