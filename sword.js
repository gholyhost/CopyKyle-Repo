let swordBackground = {
  swordHeight: 202,
  swordWidth: 100,
  swords: [],
  swordImage: 'assets/hdr/sword.png',
  maxswords: 8,
  minScale: 0.5,
  draw: function() {
    this.setCanvasSize();
    this.ctx.clearRect(0, 0, this.w, this.h);
    for (let i = 0; i < this.swords.length; i++) {
      let sword = this.swords[i];
      sword.image = new Image();
      sword.image.style.height = sword.height;
      sword.image.src = this.swordImage;
      this.ctx.globalAlpha = sword.opacity;
      this.ctx.drawImage (sword.image, sword.x, sword.y, sword.width, sword.height);
    }
    this.move();
  },
  move: function() {
    for(let b = 0; b < this.swords.length; b++) {
      let sword = this.swords[b];
      sword.y += sword.ys;
      if(sword.y > this.h) {
        sword.x = Math.random() * this.w;
        sword.y = -1 * this.swordHeight;
      }
    }
  },
  setCanvasSize: function() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.w = this.canvas.width;
    this.h = this.canvas.height;
  },
  initialize: function() {
    this.canvas = $('#canvas')[0];

    if(!this.canvas.getContext)
      return;

    this.setCanvasSize();
    this.ctx = this.canvas.getContext('2d');

    for(let a = 0; a < this.maxswords; a++) {
      let scale = (Math.random() * (1 - this.minScale)) + this.minScale;
      this.swords.push({
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        ys: Math.random() + 1,
        height: scale * this.swordHeight,
        width: scale * this.swordWidth,
        opacity: scale
      });
    }

    setInterval($.proxy(this.draw, this), 30);
  }
};

$(document).ready(function(){
  swordBackground.initialize();
});