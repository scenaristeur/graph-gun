<template>
  <div>
    Graph{{messages}}
    <div id="3d-graph" ref="graph"></div>
    or
  </div>
</template>

<script>
import ForceGraph3D from "3d-force-graph";
export default {
  name: "GraphView",
  data(){
    return {
      Graph: undefined
    }
  },
  mounted(){
    // Random tree
    const graphElement = this.$refs.graph
    const N = 300;
    const gData = {
      nodes: [...Array(N).keys()].map(i => ({ id: i })),
      links: [...Array(N).keys()]
      .filter(id => id)
      .map(id => ({
        source: id,
        target: Math.round(Math.random() * (id-1))
      }))
    };
    this.Graph = ForceGraph3D()(graphElement)
    .graphData(gData)
    .onNodeClick(this.onNodeClick);
  },
  methods: {
  onNodeClick(node) {
  console.log(node);
}
},
computed: {
  messages() {
    return this.$store.state.messages
  },
}
}
</script>

<style>

</style>
