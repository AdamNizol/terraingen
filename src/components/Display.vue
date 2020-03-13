<template>
  <div class="hello">
    <label for="speed">Speed:</label>
    <input id="speed" type="range" min="-0.6" max="1" step="0.01" v-model.number="speed" />

    <vue-p5 class="screen" v-on="{ setup, draw, keypressed, preload }"></vue-p5>

    <label for="speed">Steepness: </label>
    <input type="range" min="0" max="0.3" step="0.01" v-model.number="steepness">

    <br>
    <label for="speed">Detail: </label>
    <input type="range" min="8" max="30" step="1" v-model.number="scl">
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
      scl: 15,
      w: 800,
      h: 500,
      terrain: [],
      position: {
        x: 0,
        y: 0,
        z: 0
      },
      speed: 0.2,
      steepness: 0.14
    }

    return data
  },
  methods: {
    makeTerrain(sketch){
      this.terrain = [];
      let xoff = this.position.x;
      for(let x = 0; x < this.cols; x++){
        let col = [];
        let yoff = Math.trunc(this.position.y)*this.steepness;
        for(let y = 0; y < this.rows; y++){
          //col.push(sketch.noise(xoff, yoff)*200);
          col.push(0)
          yoff += this.steepness;
        }
        xoff += this.steepness;
        this.terrain.push(col);
      }
    },
    updateTerrain(sketch){
      //this.makeTerrain(sketch)

      let xoff = this.position.x;
      for(let x = 0; x < this.cols; x++){
        let col = [];
        let yoff = Math.trunc(this.position.y)*this.steepness;
        for(let y = 0; y < this.rows; y++){
          this.terrain[x][y] = sketch.noise(xoff, yoff)*200;
          yoff += this.steepness;
        }
        xoff += this.steepness;
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
  },
  computed: {
    cols: function () {
      return this.w/this.scl;
    },
    rows: function () {
      return this.h/this.scl;
    }
  },
  watch: {
    cols: function(val){
      this.makeTerrain();
    },
    rows: function(val){
      this.makeTerrain();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
