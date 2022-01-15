let typedStr = "", op1, op2, opr;
let isDotPressed = false, signToggle = false;

let buttons = document.querySelectorAll(".keys");
buttons.forEach(btn => btn.addEventListener("click",onKeyPress));
let screen = document.querySelector("#screen");

function updateScreen(text,mode){


    switch(mode){
        case 0:
            screen.textContent = text;
            break;

        case 1:
            screen.textContent += text;
            break;
    }
}


function onKeyPress(e){
    let key = e.target
    console.log(key.dataset.type);
    console.log(`op1 : ${op1} op2 : ${op2} typedStr : ${typedStr} opr : ${opr}`);

    switch(key.dataset.type){
        case "digit" : 
            typedStr += key.value;
            
            console.log(`typedStr : ${typedStr}`);
            updateScreen(key.value,1);
            break;
        
        case "op" :
            updateOperands();
            if(op1 !== undefined && op2 !== undefined){
                let result = performOperation(op1,op2,opr);
                opr = key.value;
                console.log(`result = ${result}`);
                updateScreen(result,0);
                typedStr = "";
                op1 = result;
                op2 = undefined;
            }
            else {
                opr = key.value;
            }
            updateScreen(key.value,1);
            break;

        case "equal" :
            updateOperands();
            if(op1 !== undefined && op2 !== undefined){
                let result = performOperation(op1,op2,opr);
                console.log(`result = ${result}`);
                updateScreen(result,0);
                typedStr = result;
                op1 = undefined;
                op2 = undefined;
                opr = undefined;
            }
            break;


        case "del" :
            deleteChar();
            break;

        
        
        case "dot" :
            if(!isDotPressed){
                typedStr += key.value;
                updateScreen(key.value,1);
            }
            
            isDotPressed = true;
            break;
        case "clear" :
            typedStr = "";
            op1 = op2 = opr = undefined;
            isDotPressed = false;
            updateScreen("",0);
            
            break;


    }
    console.log(`after op1 : ${op1} op2 : ${op2} typedStr : ${typedStr} opr : ${opr}`);
}

function updateOperands(){

    
    if(op1 === undefined){
        op1 = Number(typedStr);
        typedStr = "";
        isDotPressed = false;
        return false;
    }

    if(op1 !== undefined && op2 === undefined){
        op2 = Number(typedStr);
        typedStr = "";
        isDotPressed = false;
        console.log(`op1 : ${op1} op2 : ${op2} operator : ${opr}`);
        return true;
    }

    return true;
}

function performOperation(num1, num2, opr){
    console.log(`op1 : ${num1} op2 : ${num2} opr : ${opr}`);
    let res ;
    switch(opr){
        case '+':
            res = num1 + num2; 
            break;

        case '-':
            res = num1 - num2; 
            break;

        case '*':
            res = num1 * num2; 
            break;
        
        case '/':
            res = num1 / num2; 
            break;

    }
    return Math.round((res + Number.EPSILON) * 100) / 100;

}

function deleteChar(){
  
}