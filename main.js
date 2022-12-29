
let operator = '';
let previousValue = '';
let currentValue = '';

document.addEventListener("DOMContentLoaded",function(){

    let clear = document.querySelector(".clear");
    let equal = document.querySelector(".equal");
    let decimal = document.querySelector(".decimal");

    let numbers = document.querySelectorAll(".number");
    let operators  = document.querySelectorAll(".operator");

    let previousScreen = document.querySelector(".previous");
    let currentScreen = document.querySelector(".current");


    numbers.forEach((number) => number.addEventListener("click",function(e){
        handleNumber(e.target.textContent);
        
        currentScreen.textContent = currentValue;
    }))


    operators.forEach((op) => op.addEventListener("click",function(e){
        handleOperator(e.target.textContent);

        previousScreen.textContent = previousValue + " " + operator;
        currentScreen.textContent = currentValue;
        
    }))


    clear.addEventListener("click",function(){
        currentValue = "";
        previousValue = "";
        operator = "";

        previousScreen.textContent = currentValue;
        currentScreen.textContent = currentValue;
    })

    equal.addEventListener("click",function(){

        if(currentValue != "" && previousValue != ""){
        
        calculate();
        previousScreen.textContent = "";
        if(previousValue.length <= 7){
            currentScreen.textContent = previousValue;
        }
        else
        {
            currentScreen.textContent = previousValue.slice(0,7) + "...";
        }
        }
    })

    decimal.addEventListener("click", function(){
        addDecimal();
        currentScreen.textContent = currentValue;
    })

})


//handle clicked number button
function handleNumber(num){
    if(currentValue.length <= 7)
    {
    currentValue += num;
    }
}

//handle clicked operator button
function handleOperator(op){

    operator = op;
    previousValue = currentValue;
    currentValue = "";
}

//calculate after equal button clicked
function calculate(){
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if(operator === "+"){
        previousValue += currentValue; 
    }
    else if(operator === "-"){
        previousValue -= currentValue;
    }
    else if(operator === "*"){
        previousValue *= currentValue;
    }
    else{
        previousValue /= currentValue;
    }
    
    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    currentValue = previousValue.toString();
    console.log(previousValue);
}

//round numbers
function roundNumber(num){
    return Math.round(num * 1000) / 1000;
}


//handle decimal number clicked
function addDecimal(){
    if(!currentValue.includes('.')){
        currentValue += '.';
    }

}