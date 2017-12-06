jQuery(document).ready(function($) {

  var partNum = 80;

  var c = $('.parallax-canvas')[0];
  var ctx = c.getContext('2d');

  var w = window.innerWidth;
  var h = window.innerHeight;

  var mouse = {
    x: w / 2, 
    y: 0
  };

  document.addEventListener('mousemove', function(e){ 
      mouse.x = e.clientX || e.pageX; 
      mouse.y = e.clientY || e.pageY 
  }, false);

  var particles = [];
  for(i = 0; i < partNum; i++) {
    particles.push(new particle);
  }

  function particle() {
    this.x = Math.random() * w - w / 5;
    this.y = Math.random() * h;
    
    this.r = Math.random() * 7.5 + 3.25;
  }

  var draw = function() {
    c.width = w;
    c.height = h;
    
    for(t = 0; t < particles.length; t++) {
      var p = particles[t];
      var nowX = p.r + mouse.x / 4.6;
      var nowY = p.r + mouse.y / 4.6;
      var color = '#6f429b';
      
      if(p.r < 10) {
        nowX = p.x + mouse.x / 0.5;
        nowY = p.y + mouse.y / 0.5;
      };
      if(p.r < 9) {
        nowX = p.x + mouse.x / 2;
        nowY = p.y + mouse.y / 2;
      };
      if(p.r < 8) {
        nowX = p.x + mouse.x / 3.5;
        nowY = p.y + mouse.y / 3.5;
      };
      if(p.r < 7) {
        nowX = p.x + mouse.x / 5;
        nowY = p.y + mouse.y / 5;
      };
      if(p.r < 6) {
        nowX = p.x + mouse.x / 6.5;
        nowY = p.y + mouse.y / 6.5;
      };
      if(p.r < 5) {
        nowX = p.x + mouse.x / 8;
        nowY = p.y + mouse.y / 8;
      };
      if(p.r < 4) {
        nowX = p.x + mouse.x / 9.5;
        nowY = p.y + mouse.y / 9.5;
      };
      if(p.r < 3) {
        nowX = p.x + mouse.x / 11;
        nowY = p.y + mouse.y / 11;
      };
      if(p.r < 2) {
        nowX = p.x + mouse.x / 12.5;
        nowY = p.y + mouse.y / 12.5;
      };
      if(p.r < 1) {
        nowX = p.x + mouse.x / 15;
        nowY = p.y + mouse.y / 15;
      };
      
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(nowX, nowY, p.r, Math.PI * 4, false);
      ctx.fill();
    }
  }

  setInterval(draw, 33);

});
