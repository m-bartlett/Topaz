    mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    canvas = document.createElement('canvas'),
    context = canvas.getContext('2d'),
    A = new Dot(0),
    B = new Dot(0),
    C = new Dot(0);
    maxDist=600;
    dots = [A, B, C];
    

//Initialize
$(document).ready(function() {
    document.getElementById('canvas').appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    A.r=255; A.g=0; A.b=0;
    B.r=0; B.g=255; B.b=0;
    C.r=0; C.g=0; C.b=255;  
    A.pos.x=721; A.pos.y=57;
    B.pos.x=1290; B.pos.y=688;
    C.pos.x=254; C.pos.y=699;
    Render(context);
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
  if (window.innerWidth != canvas.width || window.innerHeight != canvas.height) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        //maxDist = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)) / maxDiv;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    
    Render(context);
});


//Dot class constructor
function Dot(ID) {
    this.pos = { x: Math.round(Math.random() * window.innerWidth), y: Math.round(Math.random() * window.innerHeight) };
    //this.vel = { x: Math.random() * speed * (Math.round(Math.random()) ? 1 : -1), y: 0 };
    //this.vel.y = Math.sqrt(Math.pow(speed, 2) - Math.pow(this.vel.x, 2)) * (Math.round(Math.random()) ? 1 : -1)
    this.r = Math.round(Math.random() * 255);
    this.g = Math.round(Math.random() * 255);
    this.b = Math.round(Math.random() * 255);
    this.id = ID;
    this.ids = new Map();
}

Dot.prototype.friend = function() {
    
    for (var i = 0; i < dots.length; i++) {
        if (lines > 0 && this.ids.size >= lines) break;
        if (this.id == i || dots[i].ids.has(this.id)) continue;
        var distance = Math.sqrt(Math.pow(this.pos.x - dots[i].pos.x, 2) + Math.pow(this.pos.y - dots[i].pos.y, 2));
        if (distance > maxDist) continue;

        this.ids.set(i, distance);
        dots[i].ids.set(this.id, distance);
    }
};

function Line(dot1, dot2) { this.d1 = dot1; this.d2 = dot2; }

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

    var center = { x: (A.pos.x + B.pos.x + C.pos.x) / 3, y: (A.pos.y + B.pos.y + C.pos.y) / 3, A: 0, B: 0, C: 0 };
        center.A = Math.sqrt(Math.pow(A.pos.x - center.x, 2) + Math.pow(A.pos.y - center.y, 2));
        center.B = Math.sqrt(Math.pow(B.pos.x - center.x, 2) + Math.pow(B.pos.y - center.y, 2));
        center.C = Math.sqrt(Math.pow(C.pos.x - center.x, 2) + Math.pow(C.pos.y - center.y, 2));

    var area = Math.abs((A.pos.x * (B.pos.y - C.pos.y) + B.pos.x * (C.pos.y - A.pos.y) + C.pos.x * (A.pos.y - B.pos.y)) / 2),
        
        //dA = (Math.sqrt(Math.pow(A.pos.x - B.pos.x, 2) + Math.pow(A.pos.y - B.pos.y, 2)) + Math.sqrt(Math.pow(A.pos.x - C.pos.x, 2) + Math.pow(A.pos.y - C.pos.y, 2))) / 2,
        //dB = (Math.sqrt(Math.pow(A.pos.x - B.pos.x, 2) + Math.pow(A.pos.y - B.pos.y, 2)) + Math.sqrt(Math.pow(B.pos.x - C.pos.x, 2) + Math.pow(B.pos.y - C.pos.y, 2))) / 2,
        //dC = (Math.sqrt(Math.pow(C.pos.x - B.pos.x, 2) + Math.pow(C.pos.y - B.pos.y, 2)) + Math.sqrt(Math.pow(A.pos.x - C.pos.x, 2) + Math.pow(A.pos.y - C.pos.y, 2))) / 2;

    //if (distanceA > maxPtoC || distanceB > maxPtoC || distanceC > maxPtoC) continue;
    //if (area < 0.1) continue;       
    //if (area > maxArea) continue;
    //if ((distanceA / maxPtoC)+(distanceB / maxPtoC)+(distanceC / maxPtoC) < .1) continue;

        AB = { x: (A.pos.x + B.pos.x) / 2, y: (A.pos.y + B.pos.y) / 2, dist: Math.sqrt(Math.pow(A.pos.x-B.pos.x, 2) + Math.pow(A.pos.y-B.pos.y, 2)) },

        BC = { x: (B.pos.x + C.pos.x) / 2, y: (B.pos.y + C.pos.y) / 2, dist: Math.sqrt(Math.pow(C.pos.x-B.pos.x, 2) + Math.pow(C.pos.y-B.pos.y, 2)) },

        CA = { x: (C.pos.x + A.pos.x) / 2, y: (C.pos.y + A.pos.y) / 2, dist: Math.sqrt(Math.pow(A.pos.x-C.pos.x, 2) + Math.pow(A.pos.y-C.pos.y, 2)) },

        perimeter = AB.dist+BC.dist+CA.dist,

        Ac2 = { x: (A.pos.x + center.x) / 2, y: (A.pos.y + center.y) / 2, dist: center.A / 2 },
        Bc2 = { x: (B.pos.x + center.x) / 2, y: (B.pos.y + center.y) / 2, dist: center.B / 2 },
        Cc2 = { x: (C.pos.x + center.x) / 2, y: (C.pos.y + center.y) / 2, dist: center.C / 2 },

        //A2c = Math.sqrt(Math.pow(A.pos.x - center.x, 2) + Math.pow(A.pos.y - center.y, 2)) * Math.sqrt(3) / 3,
        //B2c = Math.sqrt(Math.pow(B.pos.x - center.x, 2) + Math.pow(B.pos.y - center.y, 2)) * Math.sqrt(3) / 3,
        //C2c = Math.sqrt(Math.pow(C.pos.x - center.x, 2) + Math.pow(B.pos.y - center.y, 2)) * Math.sqrt(3) / 3,

        gA = c.createLinearGradient(A.pos.x, A.pos.y, BC.x, BC.y),
        gB = c.createLinearGradient(B.pos.x, B.pos.y, CA.x, CA.y),
        gC = c.createLinearGradient(C.pos.x, C.pos.y, AB.x, AB.y),

        //alphaA = (0.5 + 0.5*((AB.dist < CA.dist ? AB.dist : CA.dist)/maxDist)),        
        //alphaB = (0.5 + 0.5*((AB.dist < BC.dist ? AB.dist : BC.dist)/maxDist)),        
        //alphaC = (0.5 + 0.5*((BC.dist < CA.dist ? BC.dist : CA.dist)/maxDist)),
        alphaA=1, alphaB=1, alphaC=1,
        
        
        cA = "rgba(" + A.r + "," + A.g + "," + A.b + "," + alphaA + ")",
        cB = "rgba(" + B.r + "," + B.g + "," + B.b + "," + alphaB + ")",
        cC = "rgba(" + C.r + "," + C.g + "," + C.b + "," + alphaC + ")",

        //cA = "rgba(" + A.r + "," + A.g + "," + A.b + "," + (1 * (1 - (area / maxArea)))/3 + ")",
        //cB = "rgba(" + B.r + "," + B.g + "," + B.b + "," + (1 * (1 - (area / maxArea)))/3 + ")",
        //cC = "rgba(" + C.r + "," + C.g + "," + C.b + "," + (1 * (1 - (area / maxArea)))/3 + ")",

        //cA = "rgba(" + A.r + "," + A.g + "," + A.b + ",1)",
        //cB = "rgba(" + B.r + "," + B.g + "," + B.b + ",1)",
        //cC = "rgba(" + C.r + "," + C.g + "," + C.b + ",1)",

        //cA = "rgba(" + A.r + "," + A.g + "," + A.b + "," + ((1 - (dA / maxDist))) + ")",
        //cB = "rgba(" + B.r + "," + B.g + "," + B.b + "," + ((1 - (dB / maxDist))) + ")",
        //cC = "rgba(" + C.r + "," + C.g + "," + C.b + "," + ((1 - (dC / maxDist))) + ")",

        c0 = "rgba(0,0,0,0)";

    gA.addColorStop(0, cA); gA.addColorStop(1, c0);
    gB.addColorStop(0, cB); gB.addColorStop(1, c0);
    gC.addColorStop(0, cC); gC.addColorStop(1, c0);

    
    //A
    c.beginPath();
    c.arc(A.pos.x, A.pos.y, 5, 0, 2 * Math.PI);
    c.fillStyle = "rgba(255,255,255,1)";
    c.fill();

    //B
    c.beginPath();
    c.arc(B.pos.x, B.pos.y, 5, 0, 2 * Math.PI);
    c.fillStyle = "rgba(255,255,255,1)";
    c.fill();

    //C
    c.beginPath();
    c.arc(C.pos.x, C.pos.y, 5, 0, 2 * Math.PI);
    c.fillStyle = "rgba(255,255,255,1)";
    c.fill();

    //Solid Triangle
    c.beginPath();
    c.moveTo(A.pos.x, A.pos.y);

    c.lineTo(B.pos.x, B.pos.y);
    c.lineTo(C.pos.x, C.pos.y);
    c.lineTo(A.pos.x, A.pos.y);

    c.globalCompositeOperation = 'screen';
    c.fillStyle = gA; c.fill(); c.fillStyle = gB; c.fill(); c.fillStyle = gC; c.fill();
    c.globalCompositeOperation = 'source-over';

    c.beginPath();
    c.moveTo(A.pos.x, A.pos.y);
    c.quadraticCurveTo(center.x, center.y, B.pos.x, B.pos.y);
    c.quadraticCurveTo(center.x, center.y, C.pos.x, C.pos.y);
    c.quadraticCurveTo(center.x, center.y, A.pos.x, A.pos.y);

    cA = "rgba(0,255,255," + alphaA + ")",
    cB = "rgba(255,0,255," + alphaB + ")",
    cC = "rgba(255,255,0," + alphaC + ")",

    gA.addColorStop(0, cA); gA.addColorStop(1, c0);
    gB.addColorStop(0, cB); gB.addColorStop(1, c0);
    gC.addColorStop(0, cC); gC.addColorStop(1, c0);

    //c.globalCompositeOperation = 'destination-over';
    c.fillStyle = gA; c.fill(); c.fillStyle = gB; c.fill(); c.fillStyle = gC; c.fill();
    //c.globalCompositeOperation = 'source-over';
    

    //c.strokeStyle = gA; c.stroke(); c.strokeStyle = gB; c.stroke(); c.strokeStyle = gC; c.stroke(); 

    //AB → C
    c.beginPath(); c.moveTo(AB.x, AB.y); c.lineTo(C.pos.x, C.pos.y); c.lineWidth = 1; c.strokeStyle = "rgba(0,0,255,1)"; c.stroke();

    //BC → A
    c.beginPath(); c.moveTo(BC.x, BC.y); c.lineTo(A.pos.x, A.pos.y); c.lineWidth = 1; c.strokeStyle = "rgba(255,0,0,1)"; c.stroke();

    //CA → B
    c.beginPath(); c.moveTo(CA.x, CA.y); c.lineTo(B.pos.x, B.pos.y); c.lineWidth = 1; c.strokeStyle = "rgba(0,255,0,1)"; c.stroke();

    //AB
    c.beginPath(); c.arc(AB.x, AB.y, 5, 0, 2 * Math.PI); c.fillStyle = "rgba(255,255,255,1)"; c.fill(); 

    //CA 
    c.beginPath(); c.arc(CA.x, CA.y, 5, 0, 2 * Math.PI); c.fillStyle = "rgba(255,255,255,1)"; c.fill();

    //BC
    c.beginPath(); c.arc(BC.x, BC.y, 5, 0, 2 * Math.PI); c.fillStyle = "rgba(255,255,255,1)"; c.fill();

    //Center
    c.beginPath(); c.arc(center.x, center.y, 5, 0, 2 * Math.PI); c.fillStyle = "rgba(255,127,0,1)"; c.fill();

    //Ac2
    c.beginPath(); c.arc(Ac2.x, Ac2.y, 5, 0, 2 * Math.PI); c.fillStyle = "rgba(255,127,0,1)"; c.fill();

    //Bc2
    c.beginPath(); c.arc(Bc2.x, Bc2.y, 5, 0, 2 * Math.PI); c.fillStyle = "rgba(255,127,0,1)"; c.fill();

    //Cc2
    c.beginPath(); c.arc(Cc2.x, Cc2.y, 5, 0, 2 * Math.PI); c.fillStyle = "rgba(255,127,0,1)"; c.fill();

    //AB → BC, center
    c.beginPath(); c.moveTo(AB.x, AB.y); c.quadraticCurveTo(center.x, center.y, BC.x, BC.y); c.lineWidth = 1; c.strokeStyle = "rgba(255,0,255,1)"; c.stroke();

    //AB → BC, B
    c.beginPath(); c.moveTo(AB.x, AB.y); c.quadraticCurveTo(B.pos.x, B.pos.y, BC.x, BC.y); c.lineWidth = 1; c.strokeStyle = "rgba(255,0,255,1)"; c.stroke();

    //BC → CA, center
    c.beginPath(); c.moveTo(BC.x, BC.y); c.quadraticCurveTo(center.x, center.y, CA.x, CA.y); c.lineWidth = 1; c.strokeStyle = "rgba(255,255,0,1)"; c.stroke();

    //BC → CA, C
    c.beginPath(); c.moveTo(BC.x, BC.y); c.quadraticCurveTo(C.pos.x, C.pos.y, CA.x, CA.y); c.lineWidth = 1; c.strokeStyle = "rgba(255,255,0,1)"; c.stroke();

    //CA → AB. center
    c.beginPath(); c.moveTo(CA.x, CA.y); c.quadraticCurveTo(center.x, center.y, AB.x, AB.y); c.lineWidth = 1; c.strokeStyle = "rgba(0,255,255,1)"; c.stroke();

    //CA → AB. A
    c.beginPath(); c.moveTo(CA.x, CA.y); c.quadraticCurveTo(A.pos.x, A.pos.y, AB.x, AB.y); c.lineWidth = 1; c.strokeStyle = "rgba(0,255,255,1)"; c.stroke();

    //A → B, center
    //c.beginPath(); c.moveTo(A.pos.x, A.pos.y); c.quadraticCurveTo(center.x, center.y, B.pos.x, B.pos.y); c.lineWidth = 1; c.strokeStyle = "rgba(255,255,0,1)"; c.stroke();

    //B → C, center
    //c.beginPath(); c.moveTo(B.pos.x, B.pos.y); c.quadraticCurveTo(center.x, center.y, C.pos.x, C.pos.y); c.lineWidth = 1; c.strokeStyle = "rgba(0,255,255,1)"; c.stroke();

    //C → A, center
    //c.beginPath(); c.moveTo(C.pos.x, C.pos.y); c.quadraticCurveTo(center.x, center.y, A.pos.x, A.pos.y); c.lineWidth = 1; c.strokeStyle = "rgba(255,0,255,1)"; c.stroke();    

    //Text informatics
    c.font = '20px sans-serif';
    var stringA = "A: ("+A.pos.x+", "+A.pos.y+")   ";
    c.fillStyle="red";
    c.fillText(stringA,5,25);

    var stringB = "B: ("+B.pos.x+", "+B.pos.y+")   ";
    c.fillStyle="green";
    c.fillText(stringB,5+stringA.length*8,25);

    var stringC = "C: ("+C.pos.x+", "+C.pos.y+")   ";
    c.fillStyle="blue";
    c.fillText(stringC,5+stringA.length*8+stringB.length*8,25);
    c.fillStyle="white";
    
    c.fillText("Area: "+area+"    Perimeter: "+Math.round(perimeter*100)/100,5,50); 

    c.fillStyle="yellow";
    c.fillText("•AB: ("+Math.round(AB.x)+", "+Math.round(AB.y)+")    Length: "+Math.round(AB.dist*100)/100,5,80);
    c.fillStyle="cyan";
    c.fillText("•BC: ("+Math.round(BC.x)+", "+Math.round(BC.y)+")    Length: "+Math.round(BC.dist*100)/100,5,100);
    c.fillStyle="magenta";
    c.fillText("•CA: ("+Math.round(CA.x)+", "+Math.round(CA.y)+")    Length: "+Math.round(CA.dist*100)/100,5,120);
    c.fillStyle="orange";
    c.fillText("Center: ("+Math.round(center.x)+", "+Math.round(center.y)+")",5,150);
    c.fillText("A → Center: "+Math.round(center.A*100)/100,5,170);
    c.fillText("B → Center: "+Math.round(center.B*100)/100,5,190);
    c.fillText("C → Center: "+Math.round(center.C*100)/100,5,210);
    c.fillStyle="white";
    c.fillText("Area/Perimeter: "+(Math.round((area/perimeter)/((AB.dist+BC.dist+CA.dist)/3)*100000)/100000),5,240);
    c.fillText("Ideal A/P Ratio: "+0.14434,5,260);
    c.fillStyle="red";
    c.fillText("A radius: "+Math.round(100*Ac2.dist)/100,5,290);
    c.fillStyle="green";
    c.fillText("B radius: "+Math.round(100*Bc2.dist)/100,5,310);
    c.fillStyle="blue";
    c.fillText("C radius: "+Math.round(100*Cc2.dist)/100,5,330);
    c.fillStyle="red";
    c.fillText("A alpha: "+Math.round(100*alphaA)/100,5,360);
    c.fillStyle="green";
    c.fillText("B alpha: "+Math.round(100*alphaB)/100,5,380);
    c.fillStyle="blue";
    c.fillText("C alpha: "+Math.round(100*alphaC)/100,5,400);
}
