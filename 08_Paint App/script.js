const canvas = document.querySelector("canvas"),
toolButtons = document.querySelectorAll(".tool"),
fillColor = document.querySelector("#fill-color"),
sideSlider = document.querySelector("#size-slider"),
colorBtns = document.querySelectorAll(".colors .option"),
colorPallete = document.querySelector("#color-pallete"),
clearCanvas = document.querySelector(".clear-canvas"),
saveImage = document.querySelector(".save-img"),
undoButton = document.getElementById('undo'),
redoButton = document.getElementById('redo'),
ctx = canvas.getContext("2d"),
canvasHistory = [];

let isDrawing = false,
brushWidth = 5,
selectedTool = "brush",
prevMouseX, prevMouseY, snapshot,
selectedColor = "#000",
currentHistoryIndex = -1;

const setCanvasBackground = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor;
}

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
})

const drawRectangle = (e) => {
    if(!fillColor.checked) {
        ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    else {
        ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
}

const drawCircle = (e) => {
    ctx.beginPath();
    let radius = Math.sqrt(Math.pow((prevMouseX-e.offsetX), 2) + Math.pow((prevMouseY-e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

const drawSquare = (e) => {
    const width = prevMouseX - e.offsetX;
    const height = prevMouseY - e.offsetY;
    const side = Math.min(width, height);

    if(!fillColor.checked) {
        ctx.strokeRect(e.offsetX, e.offsetY, side, side);
    }
    else {
        ctx.fillRect(e.offsetX, e.offsetY, side, side);
    }
}

const drawTriangle = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
    ctx.closePath();
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

const drawLine = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}   

const drawing = (e) => {
    if(!isDrawing) {
        return;
    }

    saveCanvasState();
    
    ctx.putImageData(snapshot, 0, 0);

    if(selectedTool === "brush" || selectedTool === "eraser") {
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
    else if(selectedTool === "rectangle") {
        drawRectangle(e);
    }
    else if(selectedTool === "circle") {
        drawCircle(e);
    }
    else if(selectedTool === "square") {
        drawSquare(e);
    }
    else if(selectedTool === "triangle") {
        drawTriangle(e);
    }
    else {
        drawLine(e);
    }
}

const startDrawing = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height); 
}

const stopDrawing = () => {
    isDrawing = false;
}

function saveCanvasState() {
    currentHistoryIndex++;
    if (currentHistoryIndex < canvasHistory.length) {
        canvasHistory.length = currentHistoryIndex;
    }
    canvasHistory.push(canvas.toDataURL());
    console.log(canvasHistory.length);
}

function undo() {
    if (currentHistoryIndex > -1) {
        currentHistoryIndex = currentHistoryIndex - 5;
        const img = new Image();
        img.src = canvasHistory[currentHistoryIndex];
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
    }
}

function redo() {
    if (currentHistoryIndex < canvasHistory.length - 1) {
        currentHistoryIndex = currentHistoryIndex + 5;
        const img = new Image();
        img.src = canvasHistory[currentHistoryIndex];
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
    }
}

toolButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
        console.log(selectedTool);
    })
})

sideSlider.addEventListener("change", () => brushWidth = sideSlider.value);

colorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    })
})

colorPallete.addEventListener("change", () => {
    colorPallete.parentElement.style.background = colorPallete.value;
    colorPallete.parentElement.click();
})

clearCanvas.addEventListener("click", () => {
    if(confirm("Are you sure you want to clear Canvas???")) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setCanvasBackground();
        canvasHistory.length = 0; 
        currentHistoryIndex = -1; 
        saveCanvasState();
    }
})

saveImage.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `${Date.now()}.jpg`;
    link.href = canvas.toDataURL();
    link.click();
})

canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
undoButton.addEventListener('click', undo);
redoButton.addEventListener('click', redo);