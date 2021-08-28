const grid = document.querySelector('.grid')
const clearBtn = document.querySelector('#clear')
const slider = document.querySelector('input[type="range"]')

let gridSize = 16
let penMode = 'custom-color'
start()
let squares = document.querySelectorAll('.square')


function start() {
    createGrid(gridSize)
    displayGridSize()

    const penTools = document.querySelectorAll('.pen-tool')
    for (let tool of penTools) {
        tool.addEventListener('click', function () {
            penMode = tool.dataset.name
        })
    }

    clearBtn.addEventListener('click', clearGrid)
    slider.addEventListener('input', displayGridSize)
    slider.addEventListener('change', changeGridSize)
}

function createGrid(size) {
    document.documentElement.style.setProperty('--grid-size', size)

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
        square.addEventListener('mouseenter', changeColor)
    }
}

function changeGridSize() {
    for (let square of squares) {
        square.remove()
    }
    gridSize = slider.value
    createGrid(gridSize)
    squares = document.querySelectorAll('.square')
}

function displayGridSize() {
    const gridSizeDisplay = document.querySelector('label[for="grid-size"]')
    gridSizeDisplay.textContent = `Grid Size: ${slider.value} x ${slider.value}`
}

function clearGrid() {
    for (let square of squares) {
        square.style.backgroundColor = ''
    }
}

function changeColor() {
    if (penMode === 'random-color') {
        this.style.backgroundColor = getRandomColor()
    }
    else {
        const colorPicker = document.querySelector('input[type="color"]')
        this.style.backgroundColor = colorPicker.value
    }
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgb(${r}, ${g}, ${b})`
}
