const container = document.querySelector('#container');
const resetBtn = document.querySelector('#reset');
const rainbowBtn = document.getElementById('rainbow');
const eraseBtn = document.getElementById('erase');
const blackBtn = document.getElementById('black');
const colorBtn = document.getElementById('color');
const slider = document.getElementById('slider');
const sizeDisplay = document.getElementById('val');
const colorSelector = document.getElementById('selector');


let input = 16;
slider.value = input;
sizeDisplay.textContent = slider.value;


function draw() {
    let squareItems = document.querySelectorAll('.square-item');
    if (eraseBtn.classList.contains('on')) {
        mousedownLoop(squareItems, eraseSquares, addColors, addSquares, chooseColors);
    }
    else if (rainbowBtn.classList.contains('on')) {
        mousedownLoop(squareItems, addColors, addSquares, eraseSquares, chooseColors);
    }
    else if (blackBtn.classList.contains('on')) {
        mousedownLoop(squareItems, addSquares, addColors, eraseSquares, chooseColors);
    }
    else if (colorBtn.classList.contains('on')) {
        mousedownLoop(squareItems, chooseColors, addColors, addSquares, eraseSquares);
    }
    function mousedownLoop(items, actionAdd, actionRem1, actionRem2, actionRem3) {
        for (let i = 0; i < items.length; i++) {
            items[i].removeEventListener('mouseover', actionRem1);
            items[i].removeEventListener('mouseover', actionRem2);
            items[i].removeEventListener('mouseover', actionRem3);
            items[i].addEventListener('mouseover', actionAdd);
        }
    }
}

function addSquares() {
    this.style.backgroundColor = 'black';
}
function addColors() {
    this.style.backgroundColor = getRandomColor();
}
function eraseSquares() {
    this.style.backgroundColor = 'gray';
}
function chooseColors() {
    this.style.backgroundColor = colorSelector.value;
}


function makeGrid(input) {
    container.style.gridTemplateColumns = `repeat(${input}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${input}, 1fr)`;

    for (let i = 0; i < input * input; i++) {
        let squares = document.createElement('div');
        squares.className = 'square-item';
        container.appendChild(squares);
    }
}


function deleteGrid() {
    let items = document.querySelectorAll('.square-item');
    for (let i = 0; i < items.length; i++) {
        items[i].style.backgroundColor = "gray";
    }
}


function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function updateValue() {
    input = slider.value;
    sizeDisplay.textContent = slider.value;
    changeSize();
}


function changeSize() {
    deleteGrid();
    makeGrid(input);
    draw();
}


slider.addEventListener("mouseup", updateValue);

eraseBtn.addEventListener('click', function () {
    rainbowBtn.classList.remove('on');
    blackBtn.classList.remove('on');
    colorBtn.classList.remove('on');
    eraseBtn.classList.add('on');
    draw();
});

rainbowBtn.addEventListener('click', function () {
    eraseBtn.classList.remove('on');
    blackBtn.classList.remove('on');
    colorBtn.classList.remove('on');
    rainbowBtn.classList.add('on');
    draw();
});

blackBtn.addEventListener('click', function () {
    rainbowBtn.classList.remove('on');
    eraseBtn.classList.remove('on');
    colorBtn.classList.remove('on');
    blackBtn.classList.add('on');
    draw();
});

colorBtn.addEventListener('click', function () {
    colorSelector.click();
    eraseBtn.classList.remove('on');
    blackBtn.classList.remove('on');
    rainbowBtn.classList.remove('on');
    colorBtn.classList.add('on');
    draw();

});

resetBtn.addEventListener('click', function () {
    eraseBtn.classList.remove('on');
    rainbowBtn.classList.remove('on');
    colorBtn.classList.remove('on');
    blackBtn.classList.add('on');
    deleteGrid();
    draw();
});


makeGrid(input);
draw();


