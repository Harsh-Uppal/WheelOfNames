class WON {
    constructor(x, y, scale, divisions, names, angularVelocity) {

        if (names.length < divisions) {
            console.error('An eror occurred')
            return null;
        }

        this.pos = { x: x, y: y };
        this.scale = scale;
        this.divs = divisions;
        this.names = names;
        this.angularVelocity = angularVelocity;
        this.rotation = 0;

        this.SetupDivisions();
        this.LoadAutoTextScale();
    }

    SetupDivisions() {
        let anglePerDiv = TWO_PI / this.divs, hDivs = (this.divs / 2) + 1;

        this.lines = [];
        for (let i = 0; i < this.divs; i++)
            this.lines[i] = {
                x2: sin(TWO_PI / this.divs * i) * this.scale / 2,
                y2: cos(TWO_PI / this.divs * i) * this.scale / 2
            };

        for (let i = 0; i < this.divs; i++) {
            let a1 = (hDivs - i) * anglePerDiv;
            let a2 = (hDivs + 1 - i) * anglePerDiv;
        }
        this.SetupTexts();
    }

    SetupTexts() {
        //PI = 180 degree

        let anglePerDiv = PI / this.divs;
        let TWO_PIPerDiv = TWO_PI / this.divs;

        this.texts = [];
        for (let i = 0; i < this.divs; i++) {
            let textX = sin(TWO_PI / this.divs * (i - .5)) * this.scale / 4;
            let textY = cos(TWO_PI / this.divs * (i - .5)) * this.scale / 4;

            this.texts.push({
                x: textX, y: textY, text: this.names[i],
                rotation: anglePerDiv - TWO_PIPerDiv * i + HALF_PI,
                angle: TWO_PI / this.divs * (i - .5)
            });
        }
    }

    LoadAutoTextScale() {
        if (this.names.length < 1)
            return;

        let nNames = this.names;
        nNames.sort((a, b) => { return textWidth(b) - textWidth(a) });

        let stop = false, iterations = 0, size = 10;
        while (!stop && iterations < 200) {
            textSize(size);
            let s = textWidth(nNames[0]);

            if (s > this.scale / 2 - 20)
                size--;
            else {
                textSize(size + 1);
                let nS = textWidth(nNames[0]);
                if (nS > this.scale / 2 - 20)
                    stop = true;
                else
                    size++;
            }

            iterations++;
        }

        this.autoTextScale = size;
    }

    UpdateRotation() {
        this.rotation += this.angularVelocity;
        this.angularVelocity *= .99;
        this.rotation %= TWO_PI;
    }

    Display(lineColor, textColor, tSize) {
        circle(this.pos.x, this.pos.y, this.scale);

        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.rotation);

        stroke(lineColor);
        this.lines.forEach((l) => {
            line(0, 0, l.x2, l.y2);
        });

        fill(textColor);
        textAlign(CENTER, CENTER);
        if (!isNaN(tSize))
            textSize(tSize);
        else
            textSize(this.autoTextScale);

        this.texts.forEach(t => {
            push();
            translate(t.x, t.y);
            rotate(t.rotation);
            text(t.text, 0, 0);
            pop();
        });
        pop();
    }
}