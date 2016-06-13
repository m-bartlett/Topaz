    mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    canvas = document.createElement('canvas'),
    context = canvas.getContext('2d'),
    dots = [],
    Lines = new Set(),
    FPS = 20,
    stars = 3,   
    maxDiv = 11.5,
    maxDist = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)) / maxDiv,
    maxDist = 1600,
    speed = 0.25,
    thick = 10,
    lines = 10,
    G = 200,
    gravity = false,
    showDots = false,
    tether = false;

//Initialize
$(document).ready(function() {
    document.getElementById('canvas').appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (var i = 0; i < stars; i++) dots.push(new Dot(i));
    setInterval(loop, 1000 / FPS);
    dots[0].r=255; dots[0].g=127; dots[0].b=127;
    dots[1].r=127; dots[1].g=255; dots[1].b=127;
    dots[2].r=127; dots[2].g=127; dots[2].b=255;
    //context.globalCompositeOperation = 'screen';
});

//update mouse position
$(document).mousemove(function(e) {
    e.preventDefault();
    mousePos = { x: e.clientX, y: e.clientY	};
});

//Mouse click
$(document).click(function(e) {
	var closest = window.innerWidth + window.innerHeight, index = 0;
	for (var i = 0; i < dots.length; i++) {		
		var distance = Math.sqrt(Math.pow(dots[i].pos.x - mousePos.x, 2) + Math.pow(dots[i].pos.y - mousePos.y, 2));
		if (distance < closest) {
			closest = distance; index = i;
    }
  }
  dots[index].pos.x = mousePos.x;
  dots[index].pos.y = mousePos.y;
});

//Loop function
function loop() {
    // update screen size
    if (window.innerWidth != canvas.width || window.innerHeight != canvas.height) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        maxDist = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)) / maxDiv;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < dots.length; i++) dots[i].friend();
    Lines.clear();
    for (var i = 0; i < dots.length; i++) dots[i].lines();
    Render(context);
}

//Dot class constructor
function Dot(ID) {
    this.pos = { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight };
    this.vel = { x: Math.random() * speed * (Math.round(Math.random()) ? 1 : -1), y: 0 };
    this.vel.y = Math.sqrt(Math.pow(speed, 2) - Math.pow(this.vel.x, 2)) * (Math.round(Math.random()) ? 1 : -1)
    this.r = Math.round(Math.random() * 255);
    this.g = Math.round(Math.random() * 255);
    this.b = Math.round(Math.random() * 255);
    this.id = ID;
    this.ids = new Map();
}

Dot.prototype.friend = function() {
    this.ids.clear();    
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, 3, 0, 2 * Math.PI);
    context.fillStyle = "rgba(255,255,255,1)";
    context.fill();
    for (var i = 0; i < dots.length; i++) {
        if (lines > 0 && this.ids.size >= lines) break;
        if (this.id == i || dots[i].ids.has(this.id)) continue;
        var distance = Math.sqrt(Math.pow(this.pos.x - dots[i].pos.x, 2) + Math.pow(this.pos.y - dots[i].pos.y, 2));
        if (distance > maxDist) continue;

        this.ids.set(i, distance);
        dots[i].ids.set(this.id, distance);
    }
};

//Creates list of lines from dots' neighbors
Dot.prototype.lines = function() {
    if (this.ids.size > 0) {
        /*
        var min = maxDist, index = 0;
        for (var i of this.ids.keys()) if (this.ids.get(i) < min) { min = this.ids.get(i); index = i; }        
        dots[index].ids.delete(this.id);
        Lines.add(new Line(this, dots[index]));
        */
        for (var i of this.ids.keys()) {
          dots[i].ids.delete(this.id);
          Lines.add(new Line(this, dots[i]));
        }
    }
};


function Render(c) {
    for (let L of Lines) {
        var A = L.d1,
            B = L.d2,
            maxArea = Math.pow(maxDist, 2) * Math.sqrt(3) / 4,
            maxPtoC = maxDist * Math.sqrt(3) / 3;

        console.log("fuck1");
        for (var i of L.d1.ids.keys()) {
            console.log("fuck2");
            if (dots[i].id == B.id || dots[i].id == A.id) continue;
            var C = dots[i],
                center = { x: (A.pos.x + B.pos.x + C.pos.x) / 3, y: (A.pos.y + B.pos.y + C.pos.y) / 3 },
                area = (A.pos.x * (B.pos.y - C.pos.y) + B.pos.x * (C.pos.y - A.pos.y) + C.pos.x * (A.pos.y - B.pos.y)) / 2,
                distanceA = Math.sqrt(Math.pow(A.pos.x - center.x, 2) + Math.pow(A.pos.y - center.y, 2)),
                distanceB = Math.sqrt(Math.pow(B.pos.x - center.x, 2) + Math.pow(B.pos.y - center.y, 2)),
                distanceC = Math.sqrt(Math.pow(C.pos.x - center.x, 2) + Math.pow(C.pos.y - center.y, 2)),

                dA = (Math.sqrt(Math.pow(A.pos.x - B.pos.x, 2) + Math.pow(A.pos.y - B.pos.y, 2)) + Math.sqrt(Math.pow(A.pos.x - C.pos.x, 2) + Math.pow(A.pos.y - C.pos.y, 2))) / 2,
                dB = (Math.sqrt(Math.pow(A.pos.x - B.pos.x, 2) + Math.pow(A.pos.y - B.pos.y, 2)) + Math.sqrt(Math.pow(B.pos.x - C.pos.x, 2) + Math.pow(B.pos.y - C.pos.y, 2))) / 2,
                dC = (Math.sqrt(Math.pow(C.pos.x - B.pos.x, 2) + Math.pow(C.pos.y - B.pos.y, 2)) + Math.sqrt(Math.pow(A.pos.x - C.pos.x, 2) + Math.pow(A.pos.y - C.pos.y, 2))) / 2;

            //if (distanceA > maxPtoC || distanceB > maxPtoC || distanceC > maxPtoC) continue;
            //if (area < 0.1) continue;       
            //if (area > maxArea) continue;
            //if ((distanceA / maxPtoC)+(distanceB / maxPtoC)+(distanceC / maxPtoC) < .1) continue;

            var AB = { x: (A.pos.x + B.pos.x) / 2, y: (A.pos.y + B.pos.y) / 2 },

                BC = { x: (B.pos.x + C.pos.x) / 2, y: (B.pos.y + C.pos.y) / 2 },

                CA = { x: (C.pos.x + A.pos.x) / 2, y: (C.pos.y + A.pos.y) / 2 },

                A2c = Math.sqrt(Math.pow(A.pos.x - center.x, 2) + Math.pow(A.pos.y - center.y, 2)) * Math.sqrt(3) / 3,
                B2c = Math.sqrt(Math.pow(B.pos.x - center.x, 2) + Math.pow(B.pos.y - center.y, 2)) * Math.sqrt(3) / 3,
                C2c = Math.sqrt(Math.pow(C.pos.x - center.x, 2) + Math.pow(B.pos.y - center.y, 2)) * Math.sqrt(3) / 3,

                gA = c.createLinearGradient(A.pos.x, A.pos.y, BC.x, BC.y),
                gB = c.createLinearGradient(B.pos.x, B.pos.y, CA.x, CA.y),
                gC = c.createLinearGradient(C.pos.x, C.pos.y, AB.x, AB.y),

                //cA = "rgba(" + A.r + "," + A.g + "," + A.b + "," + (1 * (1 - (area / maxArea)))/3 + ")",
                //cB = "rgba(" + B.r + "," + B.g + "," + B.b + "," + (1 * (1 - (area / maxArea)))/3 + ")",
                //cC = "rgba(" + C.r + "," + C.g + "," + C.b + "," + (1 * (1 - (area / maxArea)))/3 + ")",

                cA = "rgba(" + A.r + "," + A.g + "," + A.b + ",1)",
                cB = "rgba(" + B.r + "," + B.g + "," + B.b + ",1)",
                cC = "rgba(" + C.r + "," + C.g + "," + C.b + ",1)",

                //cA = "rgba(" + A.r + "," + A.g + "," + A.b + "," + ((1 - (dA / maxDist))) + ")",
                //cB = "rgba(" + B.r + "," + B.g + "," + B.b + "," + ((1 - (dB / maxDist))) + ")",
                //cC = "rgba(" + C.r + "," + C.g + "," + C.b + "," + ((1 - (dC / maxDist))) + ")",

                c0 = "rgba(0,0,0,0)";

                /*
                c.beginPath();
                c.arc(A.pos.x, A.pos.y, 3, 0, 2 * Math.PI);
                c.arc(B.pos.x, B.pos.y, 3, 0, 2 * Math.PI);
                c.arc(C.pos.x, C.pos.y, 3, 0, 2 * Math.PI);
                c.fillStyle = "rgba(255,255,255,1)";
                c.fill();
                */

            gA.addColorStop(0, cA);
            gA.addColorStop(1, c0);
            gB.addColorStop(0, cB);
            gB.addColorStop(1, c0);
            gC.addColorStop(0, cC);
            gC.addColorStop(1, c0);

            c.beginPath();
            c.moveTo(A.pos.x, A.pos.y);

            c.lineTo(B.pos.x, B.pos.y);
            c.lineTo(C.pos.x, C.pos.y);

            //c.quadraticCurveTo(center.x, center.y, B.pos.x, B.pos.y);
            //c.quadraticCurveTo(center.x, center.y, C.pos.x, C.pos.y);
            //c.quadraticCurveTo(center.x, center.y, A.pos.x, A.pos.y);

            c.fillStyle = gA;
            c.fill();

            c.fillStyle = gB;
            c.fill();

            c.fillStyle = gC;
            c.fill();
        }
    }
};

function Line(dot1, dot2) { this.d1 = dot1; this.d2 = dot2; }
