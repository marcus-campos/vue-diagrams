import { storiesOf } from "@storybook/vue";
import Diagram from "../src/components/Diagram";
import { EventBus } from "../src/Events.js";

// Add more stories here to live develop your components
storiesOf("Diagram", module).add("Grid snap", () => ({
  data() {
    const diagramModel = new Diagram.Model();

    const node1 = diagramModel.addNode("test2", 300, 200);
    const inPort = node1.addInPort("test");

    const node2 = diagramModel.addNode("test", 10, 300, 144, 80);
    const node2OutPort = node2.addOutPort("testOut");
    node2.addOutPort("testOut2");
    node2.color = "#00cc66";

    const node3 = diagramModel.addNode("test3", 10, 100, 72, 100, {
      class: "philosopher"
    });
    const node3OutPort = node3.addOutPort("testOut3");
    node3.color = "#cc6600";
    node3.deletable = false;

    diagramModel.addLink(node2OutPort, inPort);
    diagramModel.addLink(node3OutPort, inPort);

    return {
      model: diagramModel,
      selectedItem: null,
      width: 100,
      height: 100
    };
  },
  mounted() {
    EventBus.$on("changeSelected", data => {
      this.selectedItem = data;
    });
    let width = document.getElementById("wrapper").offsetWidth;
    let height = document.getElementById("wrapper").offsetHeight;
    this.width = width;
    this.height = height;
  },
  methods: {
    edit: function() {
      this.model.editNode(this.selectedItem, "New");
    }
  },
  template: `<div id="wrapper" style="height: 750px"><diagram :width="width" :height="height" :model="model" gridSnap="16"></diagram></div>`
}));
