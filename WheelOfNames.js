class WON {
    constructor(x, y, scale, divisions, names, angularVelocity) {

        if (names.length < divisions) {
            console.error('An eror occurred')
            return null;
        }

        this.pos = { x: x, y: y };
        this.scale = scale;
        this.divisions = divisions;
        this.names = names;
        this.angularVelocity = angularVelocity;
        this.rotation = 0;

        this.SetupDivisions();
        this.LoadAutoTextScale();
    }

    SetupDivisions() {
        this.lines = [], this.texts = [];
        for (let i = 0; i < this.divisions; i++) {
            this.lines[i] = {
                x2: sin(TWO_PI / this.divisions * i) * this.scale / 2,
                y2: cos(TWO_PI / this.divisions * i) * this.scale / 2
            };
        }

        this.SetupTexts();
    }

    SetupTexts() {
        //PI = 180 degree

        let anglePerDiv = PI / this.divisions;
        let TWO_PIPerDiv = TWO_PI / this.divisions;

        this.texts = [];
        for (let i = 0; i < this.divisions; i++) {
            let textX = sin(TWO_PI / this.divisions * (i - .5)) * this.scale / 4;
            let textY = cos(TWO_PI / this.divisions * (i - .5)) * this.scale / 4;

            this.texts.push({
                x: textX, y: textY, text: this.names[i],
                rotation:anglePerDiv - TWO_PIPerDiv * i + HALF_PI
            });

            if(i == 0)
                this.p = {x:textX, y:textY};
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