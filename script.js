//Wheel of Names
let won, arrowImg;
let nams = [];
let divNumInput, divNamesList, selectedShower, selectedShowerText;

function preload() {
    arrowImg = loadImage('Arrow.png');
}

function setup() {
    createCanvas(window.innerWidth * 6 / 10, 150);

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
    image(arrowImg, won.pos.x + won.scale / 2 + width / 10, won.pos.y, 30, 25);
    // if (won.angularVelocity < .001 && won.angularVelocity != 0) {
    //     won.angularVelocity = 0;

    //     if (won.divisions > 0) {
    //         let ind = Math.floor(won.rotation / (360 / won.divisions)) - 1 - Math.ceil(won.divisions / 2);
    //         if(ind < 0)
    //             ind = won.division - ind;
    //         selectedShowerText.innerHTML = nams[ind] + ' got selected';
    //         selectedShower.style.display = '';
    //     }
    // }
}

function Spin() {
    won.angularVelocity = Math.floor(50 + Math.random() * 100) / 100;
}

function DivisionsNumChanged() {
    divNamesList.innerHTML = '';

    for (let i = 0; i < divNumInput.value; i++) {
        let element = document.createElement('li');
        let inpElement = document.createElement('input');

        inpElement.setAttribute('type', 'text');
        inpElement.setAttribute('onkeyup', 'DivisionChanged()');
        inpElement.setAttribute('id', 'Inp ' + i);

        divNamesList.appendChild(element);
        element.appendChild(inpElement);

        nams[i] = '';
    }

    won.names = nams;
    won.divisions = divNumInput.value;
    won.SetupDivisions();
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