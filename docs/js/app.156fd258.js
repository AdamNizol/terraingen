(function(e){function t(t){for(var n,i,a=t[0],u=t[1],c=t[2],l=0,f=[];l<a.length;l++)i=a[l],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&f.push(s[i][0]),s[i]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);p&&p(t);while(f.length)f.shift()();return o.push.apply(o,c||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],n=!0,a=1;a<r.length;a++){var u=r[a];0!==s[u]&&(n=!1)}n&&(o.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},s={app:0},o=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],u=a.push.bind(a);a.push=t,a=a.slice();for(var c=0;c<a.length;c++)t(a[c]);var p=u;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("Display")],1)},o=[],i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"hello"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.speed,expression:"speed"}],attrs:{type:"range",min:"-0.6",max:"1",step:"0.01"},domProps:{value:e.speed},on:{__r:function(t){e.speed=t.target.value}}}),r("vue-p5",e._g({staticClass:"screen"},{setup:e.setup,draw:e.draw,keypressed:e.keypressed,preload:e.preload}))],1)},a=[],u=(r("cb29"),r("b65f"),r("e25d")),c=r.n(u),p={name:"Display",components:{"vue-p5":c.a},data:function(){var e={scl:10,w:800,h:500,terrain:[],position:{x:0,y:0,z:0},speed:.2};return e.cols=e.w/e.scl,e.rows=e.h/e.scl,e},methods:{makeTerrain:function(e){this.terrain=[];for(var t=this.position.y,r=0;r<this.cols;r++){for(var n=[],s=this.position.x,o=0;o<this.rows;o++)n.push(200*e.noise(s,t)),s+=.14;t+=.14,this.terrain.push(n)}},updateTerrain:function(e){for(var t=.14,r=this.position.x,n=0;n<this.cols;n++){for(var s=Math.trunc(this.position.y)*t,o=0;o<this.rows;o++)this.terrain[n][o]=200*e.noise(r,s),s+=t;r+=t}},setup:function(e){this.makeTerrain(e),e.frameRate(30),e.createCanvas(this.w,this.h,e.WEBGL)},draw:function(e){this.position.y-=this.speed,this.updateTerrain(e),e.background(0),e.translate(-this.w/2,-this.h/3,-130),e.stroke(0,200,0),e.fill(0,107,0),e.rotateX(Math.PI/4);for(var t=0;t<this.rows-1;t++){e.beginShape(e.TRIANGLE_STRIP);for(var r=0;r<this.cols;r++)e.vertex(r*this.scl,(t-this.position.y%1)*this.scl,this.terrain[r][t]),e.vertex(r*this.scl,(t+1-this.position.y%1)*this.scl,this.terrain[r][t+1]);e.endShape()}},keypressed:function(e){},preload:function(e){}}},l=p,f=r("2877"),h=Object(f["a"])(l,i,a,!1,null,"7f81be12",null),d=h.exports,v={name:"App",components:{Display:d}},y=v,b=(r("5c0b"),Object(f["a"])(y,s,o,!1,null,null,null)),m=b.exports,w=r("2f62");n["a"].use(w["a"]);var g=new w["a"].Store({state:{},mutations:{},actions:{},modules:{}});n["a"].config.productionTip=!1,new n["a"]({store:g,render:function(e){return e(m)}}).$mount("#app")},"5c0b":function(e,t,r){"use strict";var n=r("9c0c"),s=r.n(n);s.a},"9c0c":function(e,t,r){}});
//# sourceMappingURL=app.156fd258.js.map