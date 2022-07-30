<template>
  <div>
    <div id="3d-graph" ref="graph"></div>
    <div id="menu">
      <button @click="transformShape('table')">TABLE</button>
      <button @click="transformShape('sphere')">SPHERE</button>
      <button @click="transformShape('helix')">HELIX</button>
      <button @click="transformShape('grid')">GRID</button>
    </div>
    {{messages.length}} messages
  </div>
</template>

<script>
import ForceGraph3D from "3d-force-graph";
import {CSS3DRenderer/*, CSS3DObject*/} from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import {CSS2DRenderer, CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import SpriteText from 'three-spritetext';
import {
  Object3D,
  Vector3} from 'three';
  // import * as TWEEN from '@tweenjs/tween.js';

  export default {
    name: "GraphView",
    data(){
      return {
        Graph: undefined,
        size: null,
        scene : null,
        objects: [],
        targets: { table: [], sphere: [], helix: [], grid: [] },
        table: [],
        periode: 50,
      }
    },
    mounted(){
      // Random tree
      // this.size = this.getSize()
      const graphElement = this.$refs.graph
      // const N = 3;
      // const gData = {
      //   nodes: [...Array(N).keys()].map(i => ({ id: i })),
      //   links: [...Array(N).keys()]
      //   .filter(id => id)
      //   .map(id => ({
      //     source: id,
      //     target: Math.round(Math.random() * (id-1))
      //   }))
      // };
      this.Graph = ForceGraph3D({extraRenderers: [new CSS2DRenderer(), new CSS3DRenderer()]})(graphElement)
      // .graphData(gData)
      // .width(this.size.w)
      // .height(this.size.h/2)
      // .backgroundColor('#aaf0b0') //'#eafaff'
      .onNodeClick(this.onNodeClick)
      .nodeAutoColorBy('group')
      .nodeThreeObject(node => {
        if(node.group == "timeNode"){
          return this.timeNodeObject(node)
        }else{
          const nodeEl = document.createElement('div');
          nodeEl.textContent = node.name;
          nodeEl.style.color = node.color;
          nodeEl.className = 'node-label';
          return new CSS2DObject(nodeEl);
        }
      })
      .nodeThreeObjectExtend(true)
      .nodeRelSize(5)
      // .linkColor('darkgrey')
      .linkCurvature(0.25)
      // .linkColor(() => 'black' )
      // .linkCurveRotation(Math.random(Math.PI/2))
      .linkThreeObjectExtend(true)
      .linkThreeObject(link => {
        // extend link with text sprite
        if(link.label != undefined){
          const sprite = new SpriteText(`${link.label}`);
          sprite.color = link.label == 'by' ?  'blue' : 'green' //'darkgrey'; //'lightgrey';
          sprite.textHeight = 3;
          return sprite;
        }
      })
      .linkDirectionalArrowLength(3.5)
      .linkDirectionalArrowRelPos(1)
      //  .linkCurvature(0.25)
      .linkPositionUpdate((sprite, { start, end }) => {
        if(sprite != undefined){
          const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
            [c]: start[c] + (end[c] - start[c]) / 4 // calc middle point
          })))
          // Position sprite
          Object.assign(sprite.position, middlePos);
        }
      })
      //.linkWidth(link => highlightLinks.has(link) ? 4 : 1)

      // let app = this
      // window.addEventListener('resize', function(){
      //   //if (store.state.graph.graph != null){
      //   app.size = app.getSize()
      //   app.Graph.width(app.size.w)
      //   app.Graph.height(app.size.h)
      //   //}
      // } );
      //this.scene = this.Graph.scene()
      this.generateCalendar()
      // this.init()
      // this.animate()
    },
    methods: {
      timeNodeObject(node){
        const nodeEl = document.createElement('div');
        // nodeEl.textContent = node.name;
        // nodeEl.style.color = "red";
        nodeEl.style.backgroundColor = node.tm_indice == 0 ?  'rgba(127,0,0,' + ( Math.random() * 0.5 + 0.5 ) + ')' : 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.5 ) + ')'
        nodeEl.className = 'element';

        const number = document.createElement( 'div' );
        number.className = 'number';
        number.textContent = node.tm_indice;
        nodeEl.appendChild( number );

        const name = document.createElement( 'div' );
        name.className = 'symbol';
        name.textContent = node.tm_jour;
        nodeEl.appendChild( name );

        const details = document.createElement( 'div' );
        details.className = 'details';
        details.innerHTML = node.tm_locale;
        nodeEl.appendChild( details );

        const thetaHelix = node.tm_indice * 0.175 + Math.PI;
        const y = - ( node.tm_indice * 8 ) + 450;

        const objectHelix = new Object3D();
        const vectorHelix = new Vector3();

        objectHelix.position.setFromCylindricalCoords( 900, thetaHelix, y );

        vectorHelix.x = objectHelix.position.x * 2;
        vectorHelix.y = objectHelix.position.y;
        vectorHelix.z = objectHelix.position.z * 2;

        objectHelix.lookAt( vectorHelix );
        objectHelix.name = "helix_"+node.tm_indice

        //targets.helix.push( objectHelix );

        nodeEl.parent = objectHelix;
        //  console.log(nodeEl)

        return new CSS2DObject(nodeEl);
      },
      generateCalendar(){
        let graphData = this.Graph.graphData()
        let now = Date.now()
        // let length = 2*this.periode+1



        for (let i = -1*this.periode ; i < this.periode; i++ ){
          let d = new Date(now)
          d.setDate(d.getDate()+i);
          let id = now+i
          const vector = new Vector3();

          const theta = (i+this.periode) * 0.175 + Math.PI;
          const y = - ( (i+this.periode) * 8 ) + 450;

          const object = new Object3D();

          object.position.setFromCylindricalCoords( 900, theta, y );

          vector.x = object.position.x * 2;
          vector.y = object.position.y;
          vector.z = object.position.z * 2;

          // object.lookAt( vector );


          graphData.nodes.push({
            id: id,
            name: d.toLocaleString(),
            tm_ts: d.getTime(),
            tm_indice: i,
            tm_locale:d.toLocaleString(),
            tm_jour:d.getDate(),
            tm_mois:d.getMonth(),
            group: 'timeNode',
            lookAt_vector : vector,
            fx: object.position.x,
            fy: object.position.y,
            fz: object.position.z,
          })
        }
        this.Graph.graphData(graphData)
      },
      //       init(){
      //         console.log("init")
      //         for ( let i = 0; i < this.table.length; i ++ ) {
      //           let timeNode = this.table[i]
      //           //console.log(timeNode)
      //           const element = document.createElement( 'div' );
      //           element.className = 'element';
      //           element.style.backgroundColor = timeNode.tm_indice == 0 ?  'rgba(127,0,0,' + ( Math.random() * 0.5 + 0.5 ) + ')' : 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.5 ) + ')'
      //           element.addEventListener('click', function(e){
      //             console.log(element, timeNode, e)
      //           })
      //
      //
      //           const number = document.createElement( 'div' );
      //           number.className = 'number';
      //           number.textContent = timeNode.tm_indice;
      //           element.appendChild( number );
      //
      //           const symbol = document.createElement( 'div' );
      //           symbol.className = 'symbol';
      //           symbol.textContent = timeNode.tm_jour;
      //           element.appendChild( symbol );
      //
      //           const details = document.createElement( 'div' );
      //           details.className = 'details';
      //           details.innerHTML = timeNode.tm_locale;
      //           element.appendChild( details );
      //
      //           const objectCSS = new CSS3DObject( element );
      //           objectCSS.name = "timeNode_"+timeNode.id
      //           objectCSS.position.x = Math.random() * 4000 - 2000;
      //           objectCSS.position.y = Math.random() * 4000 - 2000;
      //           objectCSS.position.z = Math.random() * 4000 - 2000;
      //           // this.scene.add( objectCSS );
      //           // console.log(this.scene.children)
      //
      //           //this.objects.push( objectCSS );
      //
      //           //
      //
      //           const object = new Object3D();
      //           object.position.x = ( timeNode.tm_jour * 140 ) - 1330;
      //           object.position.y = - ( timeNode.tm_mois * 180 ) + 990;
      //
      //           this.targets.table.push( object );
      //
      //         }
      //
      // this.objects = this.Graph.graphData().nodes.filter(n => n.group == 'timeNode')
      // console.log(this.objects)
      //
      //         // sphere
      //
      //         const vector = new Vector3();
      //
      //         for ( let i = 0, l = this.objects.length; i < l; i ++ ) {
      //
      //           const phi = Math.acos( - 1 + ( 2 * i ) / l );
      //           const theta = Math.sqrt( l * Math.PI ) * phi;
      //
      //           const object = new Object3D();
      //
      //           object.position.setFromSphericalCoords( 800, phi, theta );
      //
      //           vector.copy( object.position ).multiplyScalar( 2 );
      //
      //           object.lookAt( vector );
      //
      //           this.targets.sphere.push( object );
      //
      //         }
      //
      //         // helix
      //
      //         for ( let i = 0, l = this.objects.length; i < l; i ++ ) {
      //
      //           const theta = i * 0.175 + Math.PI;
      //           const y = - ( i * 8 ) + 450;
      //
      //           const object = new Object3D();
      //
      //           object.position.setFromCylindricalCoords( 900, theta, y );
      //
      //           vector.x = object.position.x * 2;
      //           vector.y = object.position.y;
      //           vector.z = object.position.z * 2;
      //
      //           object.lookAt( vector );
      //
      //           this.targets.helix.push( object );
      //
      //         }
      //
      //         // grid
      //
      //         for ( let i = 0; i < this.objects.length; i ++ ) {
      //
      //           const object = new Object3D();
      //
      //           object.position.x = ( ( i % 5 ) * 400 ) - 800;
      //           object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
      //           object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;
      //
      //           this.targets.grid.push( object );
      //
      //         }
      //       },
      //       transformShape(shape){
      //         this.transform( this.targets[shape], 2000 );
      //       },
      //       transform( targets, duration ) {
      //
      //         TWEEN.removeAll();
      //
      //         for ( let i = 0; i < this.objects.length; i ++ ) {
      //
      //           const object = this.objects[ i ];
      //           const target = targets[ i ];
      //
      // console.log(object.tm_indice, object)
      //           new TWEEN.Tween( object.position )
      //           .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
      //           .easing( TWEEN.Easing.Exponential.InOut )
      //           .start();
      //
      //           new TWEEN.Tween( object.rotation )
      //           .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
      //           .easing( TWEEN.Easing.Exponential.InOut )
      //           .start();
      //
      //         }
      //
      //         new TWEEN.Tween( this )
      //         .to( {}, duration * 2 )
      //         //.onUpdate( render )
      //         .start();
      //
      //       },
      //       animate() {
      //         TWEEN.update();
      //       },

      onNodeClick(node) {
        console.log(node);
        //  console.log(this.scene)
      },
      findTimeNode(ts){
        //  console.log(ts)

        let temp = {};

        this.Graph.graphData().nodes.filter(n => n.group == 'timeNode').forEach((n) => {
          let gap = Math.abs(ts - n.tm_ts)
          //  console.log(ts, n.tm_ts, gap)
          if (temp.gap == undefined || gap < temp.gap) {
            temp = {gap: gap, id: n.id };
          }
        });
        return temp.id
      }
      // getSize(){
      //   return {w: window.innerWidth > 768 ? window.innerWidth*0.75 : window.innerWidth,
      //     h: window.innerWidth > 768 ? window.innerHeight*.9 : window.innerHeight*.8}
      //   }
    },
    watch:{
      room(){
        this.Graph.graphData({nodes: this.Graph.graphData().nodes.filter(n => n.group == 'timeNode'), links: []})
      },
      messages(){
        let app = this
        let { nodes, links } = this.Graph.graphData();
        let last = null
        this.messages.forEach((m) => {
         let timeNode_id = m.when != undefined ? app.findTimeNode(m.when) : undefined
          let n = { id: m.id, name: m.what, group: "message", created: m.when };
          let who = {id: m.who, name: m.who, group: "who"}
          let index = nodes.findIndex((x) => x.id == m.id);
          index === -1 ? nodes.push(n) : Object.assign(nodes[index], n);

          let indexWho = nodes.findIndex((x) => x.id == who.id);
          indexWho === -1 ? nodes.push(who) : Object.assign(nodes[indexWho], who);
          links.push({ source: m.id, target: who.id, label: "by" });

         timeNode_id != undefined ? links.push({source: n.id, target: timeNode_id, label: "created", color: "red"}) : ""
          if (last != null) {
            links.push({ source: last, target: m.id, label: "next" });
          }
          last = m.id;
        });

        this.Graph.graphData({
          nodes: nodes, // messages, //[...nodes, { id }],
          links: links, //[...links, { source: id, target: Math.round(Math.random() * (id-1)) }]
        });
      }
    },
    computed: {
      messages() {
        return this.$store.state.messages
      },
      room() {
        return this.$store.state.room
      },
    }
  }
  </script>

  <style>
  .node-label {
    font-size: 12px;
    padding: 1px 4px;
    border-radius: 4px;
    background-color: rgba(0,0,0,0.5);
    user-select: none;
  }
  /* helix */
  a {
    color: #8ff;
  }

  #menu {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
  }

  .element {
    width: 120px;
    height: 160px;
    box-shadow: 0px 0px 12px rgba(0,255,255,0.5);
    border: 1px solid rgba(127,255,255,0.25);
    font-family: Helvetica, sans-serif;
    text-align: center;
    line-height: normal;
    cursor: default;
  }

  .element:hover {
    box-shadow: 0px 0px 12px rgba(0,255,255,0.75);
    border: 1px solid rgba(127,255,255,0.75);
  }

  .element .number {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 12px;
    color: rgba(127,255,255,0.75);
  }

  .element .symbol {
    position: absolute;
    top: 40px;
    left: 0px;
    right: 0px;
    font-size: 60px;
    font-weight: bold;
    color: rgba(255,255,255,0.75);
    text-shadow: 0 0 10px rgba(0,255,255,0.95);
  }

  .element .details {
    position: absolute;
    bottom: 15px;
    left: 0px;
    right: 0px;
    font-size: 12px;
    color: rgba(127,255,255,0.75);
  }

  button {
    color: rgba(127,255,255,0.75);
    background: transparent;
    outline: 1px solid rgba(127,255,255,0.75);
    border: 0px;
    padding: 5px 10px;
    cursor: pointer;
  }

  button:hover {
    background-color: rgba(0,255,255,0.5);
  }

  button:active {
    color: #000000;
    background-color: rgba(0,255,255,0.75);
  }
  </style>
