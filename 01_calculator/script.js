function handleKeyBoardPress(event) {
    const key = event.key;
    const display = document.querySelector("input[name='display']");

    const allowedKeys = /[0-9+\-*/.=]|Backspace|Escape|Enter/;

    if(!key.match(allowedKeys)) {
        return;
    }

    switch(key) {
        case 'Enter':
            display.value = eval(display.value);
            break;
        case 'Backspace':
            display.value = display.value.slice(0, -1);
            break;
        case 'Escape':
            display.value = '';
            break;
        default:
            display.value += key;
            break;
    }

    event.preventDefault(); 
}   


document.addEventListener("keydown", handleKeyBoardPress);


function appendToDisplay(value) {
    const display = document.querySelector("input[name='display']");
    if(value === 'AC') {
        display.value = '';
    }
    else if(value === 'DE') {
        display.value = display.value.slice(0, -1); // delete the last character
    }
    else if(value === '=') {
        display.value = eval(display.value);
    }
    else {
        display.value += value;
    }
}

const buttons = document.querySelectorAll("input[type='button']");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.add("clicked");
    })
})