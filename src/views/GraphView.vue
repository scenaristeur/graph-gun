<template>
  <div>

    <div id="3d-graph" ref="graph"></div>
    {{messages.length}} messages
  </div>
</template>

<script>
import ForceGraph3D from "3d-force-graph";
import {CSS2DRenderer, CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer.js';

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
    // .linkColor('darkgrey')
    .linkAutoColorBy(link => {return link.target.group})

let app = this
    window.addEventListener('resize', function(){
      //if (store.state.graph.graph != null){
        app.size = app.getSize()
        // store.state.graph.graph.width(size.w)
        // store.state.graph.graph.height(size.h)
      //}
    } );
  },
  methods: {
    onNodeClick(node) {
      console.log(node);
    },
    getSize(){

      //768 = medium bootstrap
      return {w: window.innerWidth > 768 ? window.innerWidth/2 : window.innerWidth,
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
