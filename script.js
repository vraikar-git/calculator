let typedStr = "", op1, op2, opr;
let isDotPressed = false, signToggle = false;

let buttons = document.querySelectorAll(".keys");
buttons.forEach(btn => btn.addEventListener("click",onKeyClick));
window.addEventListener("keyup",onKeyPress);
let screen = document.querySelector("#screen");

function onKeyPress(e){

    console.log(e);
    let key = document.querySelector(`button[value="${e.key}"]`);
    
    console.log(key);
    if(key === null){
        let choice;
        switch(e.key){
            case "Enter" :
            case "=" :
                choice = "equal";
                break;

            case "Backspace":
                choice = "del";
                break;

            case "Delete":
                choice = "clear"
                break;

            default : 
                console.log(e.key);
                return;
        }

        key = document.querySelector(`button[data-type="${choice}"]`);;
        key.click();
    }
    else{
        key.click();
    }
}

function onKeyClick(e){
    let key = e.target
    performSwitch(key.dataset.type,key.value);
    
}

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


function performSwitch(selection,value){

    switch(selection){
        case "digit" : 
            typedStr += value;
            updateScreen(value,1);
            break;
        
        case "op" :
            if(updateOperands()){
                updateScreen(value,1);
                
            };
            if(op1 !== undefined && op2 !== undefined){
                let result = performOperation(op1,op2,opr);
                if(result === Infinity){
                    
                    alert("Division by Zero !!");
                    typedStr = "";
                    op1 = op2 = opr = undefined;
                    isDotPressed = false;
                    updateScreen("",0);
                    break;
                }
                opr = value;
                updateScreen(result,0);
                typedStr = "";
                op1 = result;
                op2 = undefined;
                updateScreen(value,1);
            }
            opr = value;
            break;

        case "equal" :
            
            if(op1 !== undefined && op2 === undefined && typedStr != ""){
                updateOperands();
                let result = performOperation(op1,op2,opr);
                if(result === Infinity){
                    alert("Division by Zero !!");
                    typedStr = "";
                    op1 = op2 = opr = undefined;
                    isDotPressed = false;
                    updateScreen("",0);
                    break;
                }
                updateScreen(result,0);
                typedStr = String(result);
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
                typedStr += value;
                updateScreen(value,1);
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
}
    
function updateOperands(){
    if(op1 === undefined && typedStr !== ""){
        op1 = Number(typedStr);
        typedStr = "";
        isDotPressed = false;
        return true;
    }
    if(op1 !== undefined && op2 === undefined && typedStr !== ""){
        op2 = Number(typedStr);
        typedStr = "";
        isDotPressed = false;
        return true;
}
return false;
}

function deleteChar(){
    if(op1 === undefined){
        typedStr = typedStr.slice(0,-1);
        if(isDotPressed){
            isDotPressed = false;
        }
        updateScreen(typedStr,0);
    } else if(op1 !== undefined && opr !== undefined){
        if(typedStr === ""){
            typedStr = String(op1);
            updateScreen(typedStr,0);
            opr = undefined;
            op1 = undefined;

        } else {
            typedStr = typedStr.slice(0,-1);
            if(isDotPressed){
                isDotPressed = false;
            }
            let str = String(op1 + opr + typedStr);
            updateScreen(str,0);
        }
    } 
}

function performOperation(num1, num2, opr){
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
