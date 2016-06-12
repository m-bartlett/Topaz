  mousePos = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  },
  canvas = document.createElement('canvas'),
  context = canvas.getContext('2d'),
  dots = [],
  Lines = new Set(),
  FPS = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 30 : 60,
  stars = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 25 : 50,
  //stars = 5;
  //maxDist = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 75 : 100,
  maxDiv = 11.5,
  maxDist = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)) / maxDiv,
  speed = 0.25,
  thick = 3.5,
  //lines = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 3 : 5,
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
  $('input[type="range"]').each(function(i) {
    this.value = window[this.id];
  });
  $('input[type="checkbox"]').each(function(i) {
    this.checked = window[this.id] ? window[this.id].toString() : "";
  });
  for (var i = 0; i < stars; i++) dots.push(new Dot(i));
    setInterval(loop, 1000 / FPS);
  console.log(new Date().getTime());
});

//update mouse position
$(document).mousemove(function(e) {
  e.preventDefault();
  mousePos = { x: e.clientX, y: e.clientY };
});

//Slider and checkbox updates
$(function() {
  $('input[type="range"]').change(function(e) {
    if (e.target.id == 'speed') {
      for (let d of dots) {
        d.vel.x *= e.target.value / speed;
        d.vel.y *= e.target.value / speed;
      }
    }

    window[e.target.id] = e.target.value;
    console.log(e.target.id + " -> " + e.target.value);

    if (e.target.id == 'maxDiv') maxDist = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)) / maxDiv;

    if (stars < dots.length) {
      dots = dots.slice(0, stars);
    } else if (stars > dots.length)
    for (var i = dots.length; i < stars; i++) dots.push(new Dot(i));
  });

  $('input[type="checkbox"]').change(function(e) {
    window[e.target.value] = e.target.checked;
    if (tether) for (let d of dots) { d.vel.x *= 2; d.vel.y *= 2; } 
    else for (let d of dots) { d.vel.x /= 2; d.vel.y /= 2; }        
  });
})


//Loop function
function loop() {
    // update screen size
    if (window.innerWidth != canvas.width || window.innerHeight != canvas.height) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      maxDist = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)) / maxDiv;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < dots.length; i++) dots[i].update();
    for (var i = 0; i < dots.length; i++) dots[i].friend();
    Lines.clear();
    for (var i = 0; i < dots.length; i++) dots[i].lines();   
    Render(context);
}


//Dot class constructor
function Dot(ID) {
  this.pos = {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight
  };
  this.vel = {
    x: Math.random() * speed * (Math.round(Math.random()) ? 1 : -1),
    y: 0
  };
    //this.vel.y = Math.random() * speed * (Math.round(Math.random()) ? 1 : -1);
    this.vel.y = Math.sqrt(Math.pow(speed, 2) - Math.pow(this.vel.x, 2)) * (Math.round(Math.random()) ? 1 : -1)
    this.r = Math.round(Math.random() * 255);
    this.g = Math.round(Math.random() * 255);
    this.b = Math.round(Math.random() * 255);
    this.id = ID;    
    this.ids = new Map();
  }

//Update Dot's position
Dot.prototype.update = function() {
  if (tether && this.ids.size > 0) {
    X = this.vel.x, Y = this.vel.y;
    for (let d of this.ids) {
      if (!dots[d]) break;
      X += dots[d].vel.x;
      Y += dots[d].vel.y;
    }
    X /= (this.ids.size + 1);
    Y /= (this.ids.size + 1);
    this.pos.x += (4 * X + this.vel.x) / 5;
    this.pos.y += (4 * Y + this.vel.y) / 5;
  } else {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
  if (this.pos.x <= 0) this.vel.x *= (this.vel.x > 0 ? 1 : -1);
  if (this.pos.x >= window.innerWidth) { this.vel.x *= (this.vel.x < 0 ? 1 : -1); this.pos.x = window.innerWidth; }
  if (this.pos.y <= 0) this.vel.y *= (this.vel.y > 0 ? 1 : -1); 
  if (this.pos.y >= window.innerHeight) { this.vel.y *= (this.vel.y < 0 ? 1 : -1); this.pos.y = window.innerHeight; }
};

//Check proximity of other Dots
Dot.prototype.friend = function() {
  this.ids.clear();
  for (var i = 0; i < dots.length; i++) {
    if (lines > 0 && this.ids.size >= lines) break;
    if (this.id==i || dots[i].ids.has(this.id)) continue;
    var distance = Math.sqrt(Math.pow(this.pos.x - dots[i].pos.x, 2) + Math.pow(this.pos.y - dots[i].pos.y, 2));
    if (distance > maxDist) continue;

    this.ids.set(i, distance);
    dots[i].ids.set(this.id, distance);
  }
};

//Creates list of lines from dots' neighbors
Dot.prototype.lines = function() {  
  if (this.ids.size > 0) {   
    for (var i of this.ids.keys()) {
        dots[i].ids.delete(this.id);
        Lines.add(new Line(this, dots[i]));        
    }
  }
};

function Render(c) {    
    for (let L of Lines) {
      var A = L.d1, B = L.d2,
          maxArea = Math.pow(maxDist,2)*Math.sqrt(3)/4
          maxPtoC = maxDist*Math.sqrt(3)/3
     
        for (var i of L.d1.ids.keys()) {
          var C = dots[i];
          if (C.id == B.id || C.id == A.id) continue;
          var center = { x: (A.pos.x + B.pos.x + C.pos.x)/3, y: (A.pos.y + B.pos.y + C.pos.y)/3 };
          var area = (A.pos.x*(B.pos.y-C.pos.y)+B.pos.x*(C.pos.y-A.pos.y)+C.pos.x*(A.pos.y-B.pos.y))/2;
              distanceA = Math.sqrt(Math.pow(A.pos.x - center.x, 2) + Math.pow(A.pos.y - center.y, 2)),
              distanceB = Math.sqrt(Math.pow(B.pos.x - center.x, 2) + Math.pow(B.pos.y - center.y, 2)),
              distanceC = Math.sqrt(Math.pow(C.pos.x - center.x, 2) + Math.pow(C.pos.y - center.y, 2));
              //if (distanceA > maxPtoC || distanceB > maxPtoC || distanceC > maxPtoC) continue;
              if (area < 0.1) continue;       
              if (area > maxArea) continue;

           var AB = { x: (A.pos.x+B.pos.x)/2, y: (A.pos.y+B.pos.y)/2 },

              BC = { x: (B.pos.x+C.pos.x)/2, y: (B.pos.y+C.pos.y)/2 },

              CA = { x: (C.pos.x+A.pos.x)/2, y: (C.pos.y+A.pos.y)/2 },

              A2c = Math.sqrt(Math.pow(A.pos.x - center.x, 2) + Math.pow(A.pos.y - center.y, 2))*Math.sqrt(3)/3,
              B2c = Math.sqrt(Math.pow(B.pos.x - center.x, 2) + Math.pow(B.pos.y - center.y, 2))*Math.sqrt(3)/3,
              C2c = Math.sqrt(Math.pow(C.pos.x - center.x, 2) + Math.pow(B.pos.y - center.y, 2))*Math.sqrt(3)/3,

              gA = c.createLinearGradient(A.pos.x, A.pos.y, BC.x, BC.y),
              gB = c.createLinearGradient(B.pos.x, B.pos.y, CA.x, CA.y),
              gC = c.createLinearGradient(C.pos.x, C.pos.y, AB.x, AB.y),
              
              //cA = "rgba(" + A.r + "," + A.g + "," + A.b + "," + (1 * (1 - (area / maxArea)))/3 + ")",
              //cB = "rgba(" + B.r + "," + B.g + "," + B.b + "," + (1 * (1 - (area / maxArea)))/3 + ")",
              //cC = "rgba(" + C.r + "," + C.g + "," + C.b + "," + (1 * (1 - (area / maxArea)))/3 + ")",

              cA = "rgba(" + A.r + "," + A.g + "," + A.b + "," + ((1 - (distanceA / maxPtoC))) + ")",
              cB = "rgba(" + B.r + "," + B.g + "," + B.b + "," + ((1 - (distanceA / maxPtoC))) + ")",
              cC = "rgba(" + C.r + "," + C.g + "," + C.b + "," + ((1 - (distanceA / maxPtoC))) + ")",              

       

              c0 = "rgba(0,0,0,0)";
              gA.addColorStop(0, cA); gA.addColorStop(1, c0);
              gB.addColorStop(0, cB); gB.addColorStop(1, c0);
              gC.addColorStop(0, cC); gC.addColorStop(1, c0);

          c.beginPath();
          c.moveTo(A.pos.x, A.pos.y);
          c.lineTo(B.pos.x, B.pos.y);
          c.lineTo(C.pos.x, C.pos.y);
          
          c.fillStyle = gA;
          c.fill();
          
          c.fillStyle = gB;
          c.fill();
          
          c.fillStyle = gC;
          c.fill();          
          
        }
  }                
};

//Line class constructor
function Line(dot1, dot2) {
    this.d1 = dot1;
    this.d2 = dot2;
}