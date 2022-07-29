<template>
  <div>
    <div id="3d-graph" ref="graph"></div>
    {{messages.length}} messages
  </div>
</template>

<script>
import ForceGraph3D from "3d-force-graph";
import {CSS2DRenderer, CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import SpriteText from 'three-spritetext';

export default {
  name: "GraphView",
  data(){
    return {
      Graph: undefined,
      size: null
    }
  },
  mounted(){
    // Random tree
    this.size = this.getSize()
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
    this.Graph = ForceGraph3D({extraRenderers: [new CSS2DRenderer()]})(graphElement)
    // .graphData(gData)
    .width(this.size.w)
    .height(this.size.h/2)
    .backgroundColor('#aaf0b0') //'#eafaff'
    .onNodeClick(this.onNodeClick)
    .nodeAutoColorBy('group')
    .nodeThreeObject(node => {
      const nodeEl = document.createElement('div');
      nodeEl.textContent = node.name;
      nodeEl.style.color = node.color;
      nodeEl.className = 'node-label';
      return new CSS2DObject(nodeEl);
    })
    .nodeThreeObjectExtend(true)
    .nodeRelSize(5)
    // .linkColor('darkgrey')
    .linkCurvature(0.25)
    .linkColor(() => 'black' )
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

    let app = this
    window.addEventListener('resize', function(){
      //if (store.state.graph.graph != null){
      app.size = app.getSize()
      app.Graph.width(app.size.w)
      app.Graph.height(app.size.h)
      //}
    } );
  },
  methods: {
    onNodeClick(node) {
      console.log(node);
    },
    getSize(){

      //768 = medium bootstrap
      return {w: window.innerWidth > 768 ? window.innerWidth*0.75 : window.innerWidth,
        h: window.innerWidth > 768 ? window.innerHeight*.9 : window.innerHeight*.8}
      }


    },
    watch:{
      room(){
        this.Graph.graphData({nodes: [], links: []})
      },
      messages(){
        let { nodes, links } = this.Graph.graphData();
        let last = null
        this.messages.forEach((m) => {
          let n = { id: m.id, name: m.what, group: "message" };
          let who = {id: m.who, name: m.who, group: "who"}
          let index = nodes.findIndex((x) => x.id == m.id);
          index === -1 ? nodes.push(n) : Object.assign(nodes[index], n);

          let indexWho = nodes.findIndex((x) => x.id == who.id);
          indexWho === -1 ? nodes.push(who) : Object.assign(nodes[indexWho], who);
          links.push({ source: m.id, target: who.id, label: "by" });
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
  </style>
