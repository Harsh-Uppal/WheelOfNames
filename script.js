//Wheel of Names
let won, arrowImg;
let nams = [];
let divNumInput, divNamesList, selectedShower, selectedShowerText;

function preload() {
    arrowImg = loadImage('Assets/Arrow.png');
}

function setup() {
    createCanvas(window.innerWidth * 6 / 10, 450);

    divNumInput = document.getElementById('divNumInput');
    divNamesList = document.getElementById('divNamesList');
    selectedShower = document.getElementById('ChosenShower');
    selectedShowerText = document.getElementById('ChosenText');

    won = new WON(
        width / 2, height / 2,
        Math.min(height, width) * 4 / 5,
        0, nams, 0
    );

    angleMode(RADIANS);
    imageMode(CENTER);
    stroke(255);
    fill(0);
}

function draw() {
    background(0);
    won.Display(255, 'lime');
    won.UpdateRotation();
    image(arrowImg, won.pos.x + won.scale / 2 + width / 10, won.pos.y, 80, 70);
}

function Spin() {
    won.angularVelocity = Math.floor(50 + Math.random() * 100) / 100;
}

function DivisionsNumChanged() {
    divNamesList.innerHTML = '';

    for (let i = 0; i < divNumInput.value; i++) {
        let inpElement = document.createElement('input');

        inpElement.setAttribute('type', 'text');
        inpElement.setAttribute('onkeyup', 'DivisionChanged()');
        inpElement.setAttribute('id', 'Inp ' + i);

        divNamesList.appendChild(inpElement);

        nams[i] = '';
    }

    won.names = nams;
    won.divs = divNumInput.value;
    won.SetupDivisions();
    won.SetupTexts();
    won.LoadAutoTextScale();
}

function DivisionChanged() {
    for (let i = 0; i < divNumInput.value; i++)
        nams[i] = document.getElementById('Inp ' + i).value;

    won.names = nams;
    won.LoadAutoTextScale();
    won.SetupTexts();
}

function OkBtnClick() {
    selectedShower.style.display = 'none';
}