<template>
  <div class="hello">
    <label for="speed">Speed:</label>
    <input id="speed" type="range" min="-0.6" max="1" step="0.01" v-model.number="speed" />

    <vue-p5 class="screen" v-on="{ setup, draw, keypressed, preload }"></vue-p5>

    <label for="steepness">Steepness: </label>
    <input id="steepness" type="range" min="0" max="0.3" step="0.01" v-model.number="steepness">

    <br>
    <label for="detail">Detail: </label>
    <input id="detail" type="range" min="8" max="30" step="1" v-model.number="scl">

    <br>
    <label for="maxHeight">Max Height: </label>
    <input id="maxHeight" type="range" min="50" max="350" step="1" v-model.number="maxSize">

    <br>
    <label for="wireFrame">WireFrame: </label>
    <input id="wireFrame" type="checkbox" v-model="wireFrame" />
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
      wireFrame: true,
      maxSize: 200,
      terrain: [],
      position: {
        x: 0,
        y: 0,
        z: 0
      },
      speed: 0.2,
      steepness: 0.14,
      tiles: {
        grass: null
      }
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
          this.terrain[x][y] = sketch.noise(xoff, yoff)*this.maxSize;
          yoff += this.steepness;
        }
        xoff += this.steepness;
      }
    },
    setup(sketch){
      this.makeTerrain(sketch);
      sketch.frameRate(30);
      sketch.createCanvas(this.w,this.h, sketch.WEBGL);
      this.tiles.grass = sketch.loadImage(require('@/images/tiles/Grass.png'));
      this.tiles.grass.resize(this.scl,this.scl);
      //sketch.frameRate(10);
    },
    draw(sketch){
      this.position.y -= this.speed;
      this.updateTerrain(sketch);
      sketch.background(0);
      sketch.translate(-this.w/2, -this.h/3, -130);
      sketch.rotateX(Math.PI/4);

      if(this.wireFrame){
        sketch.stroke(0,200,0);
        //sketch.noFill();
        sketch.fill(0,107,0);
      }else{
        //sketch.textureWrap(sketch.REPEAT);
        sketch.texture(this.tiles.grass);
        //sketch.pointLight(255,255,255, 200,200, 50)
        //sketch.lights();

        //sketch.directionalLight(255,255,255, -200, -200, -1);
      }



      for(let y = 0; y < (this.rows-1); y++){
        sketch.beginShape(sketch.TRIANGLE_STRIP);
        for(let x = 0; x < this.cols; x++){
          let tileSize = this.scl;
          let paramsUpper = [
            x*this.scl,
            (y - (this.position.y % 1) )*this.scl,
            this.terrain[x][y]
          ];

          let paramsLower = [
            x*this.scl,
            (y+1 - (this.position.y % 1))*this.scl,
            this.terrain[x][y+1]
          ];

          if(!this.wireFrame){
            //uv coords
            paramsUpper.push(tileSize*(x), 0);
            paramsLower.push(tileSize*(x), tileSize);
          }

          sketch.vertex( ...paramsUpper );
          sketch.vertex( ...paramsLower );

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
