const rangeValue = document.querySelector('#range');
const grid = document.querySelector('.grid');
const title = document.querySelector('.rangeTitle');
const color = document.querySelector('#colorPicker');
let squares = document.querySelectorAll('.square')
let currentColor;
let divs;
let trigger = false;
const rainbowBtn = document.querySelector('.rainbowBtn')
const eraserBtn = document.querySelector('.eraserBtn')
const clearBtn = document.querySelector('.clearBtn')
const btns = document.querySelectorAll('button')
let colorMode;


rangeValue.addEventListener('change', gridChange);
rangeValue.addEventListener('mousemove', textChange);
window.addEventListener('load', startAll);
document.addEventListener('mousedown', () => {
    trigger = true;
})
document.addEventListener('mouseup', () => {
    trigger = false;
})
color.addEventListener('input',currColor);
rainbowBtn.addEventListener('click', rainbow)
eraserBtn.addEventListener('click', eraser)
clearBtn.addEventListener('click', clearAll)
btns.forEach(btn => btn.addEventListener('click', function clicked() {
    for(let j of btns) {
        if(j.classList.contains('clicked')) {
            j.classList.toggle('clicked')
        }
    }
    this.classList.toggle('clicked')
}))

function currColor(e) {
        currentColor = color.value;
        colorMode = 'colorInput';
        for(let i of btns) {
            i.classList.remove('clicked')
        }
}

function gridChange() {
    let value = rangeValue.value;
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${value}, 1fr)`;
    addDiv(value);
}

function addDiv(num) {
    for(let i = 0; i < num ** 2; i++) {
        let div = document.createElement('div');
        div.classList.add('square')
        grid.append(div);
    }
    divs = document.querySelectorAll('.grid div');
    divs.forEach(div => {
        div.addEventListener('mousedown', changeColor)
        div.addEventListener('mouseover', changeColor)
    })
}


function textChange() {
    title.innerText = `${this.value} X ${this.value}`;
}

function changeColor(e) {
    if(trigger  || e.type === "mousedown"){
        if(colorMode === 'colorInput'){
            this.style.background = currentColor;
        }
        else if(colorMode === 'multiColor') {
            this.style.background = rainbow();
        }
        else if(colorMode === 'eraser') {
            this.style.removeProperty('background')
        }
    }
}

function rainbow(e) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    colorMode = 'multiColor';
    return `rgb(${r},${g},${b})`
}

function startAll() {
    currColor();
    gridChange();
}

function eraser(e) {
    colorMode = 'eraser';
}
function clearAll() {
    divs.forEach(div => div.style.removeProperty('background'))
}
