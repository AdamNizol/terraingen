<template>
  <div class="hello">
    <input type="range" min="-0.6" max="1" step="0.01" v-model="speed" />
    <vue-p5 class="screen" v-on="{ setup, draw, keypressed, preload }"></vue-p5>
  </div>
</template>

<script>
import VueP5 from "vue-p5";

export default {
  name: "Display",
  components: {
    "vue-p5": VueP5
  },
  data(){
    let data = {
      scl: 10,
      w: 800,
      h: 500,
      terrain: [],
      position: {
        x: 0,
        y: 0,
        z: 0
      },
      speed: 0.2
    }
    data.cols = data.w/data.scl;
    data.rows = data.h/data.scl;

    return data
  },
  methods: {
    makeTerrain(sketch){
      this.terrain = [];
      let yoff = this.position.y;
      for(let x = 0; x < this.cols; x++){
        let col = [];
        let xoff = this.position.x;
        for(let y = 0; y < this.rows; y++){
          col.push(sketch.noise(xoff, yoff)*200);
          xoff += 0.14;
        }
        yoff += 0.14;
        this.terrain.push(col);
      }
    },
    updateTerrain(sketch){
      let dOff = 0.14;

      let xoff = this.position.x;
      for(let x = 0; x < this.cols; x++){
        let col = [];
        let yoff = Math.trunc(this.position.y)*dOff;
        for(let y = 0; y < this.rows; y++){
          this.terrain[x][y] = sketch.noise(xoff, yoff)*200;
          yoff += dOff;
        }
        xoff += dOff;
      }
    },
    setup(sketch){
      this.makeTerrain(sketch);
      sketch.frameRate(30);
      sketch.createCanvas(this.w,this.h, sketch.WEBGL);
      //sketch.frameRate(10);
    },
    draw(sketch){
      this.position.y -= this.speed;

      this.updateTerrain(sketch);


      sketch.background(0);

      sketch.translate(-this.w/2, -this.h/3, -130);

      sketch.stroke(0,200,0);
      //sketch.noFill();
      sketch.fill(0,107,0);

      sketch.rotateX(Math.PI/4);
      for(let y = 0; y < (this.rows-1); y++){
        sketch.beginShape(sketch.TRIANGLE_STRIP);
        for(let x = 0; x < this.cols; x++){
          sketch.vertex(x*this.scl, (y - (this.position.y % 1) )*this.scl, this.terrain[x][y]);
          sketch.vertex(x*this.scl, (y+1 - (this.position.y % 1))*this.scl, this.terrain[x][y+1]);
          //sketch.vertex(x*this.scl, (y - (this.position.x % 1) )*this.scl, 0);
          //sketch.vertex(x*this.scl, (y+1 - (this.position.x % 1) )*this.scl, 0);
          //sketch.rect(x*this.scl, y*this.scl,this.scl, this.scl);
        }
        sketch.endShape();
      }
    },
    keypressed(sketch){

    },
    preload(sketch){

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
