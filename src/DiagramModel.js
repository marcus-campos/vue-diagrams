import DiagramNode from "./DiagramNode";

/**
 * @class DiagramModel
 */
class DiagramModel {
  /**
   */
  constructor() {
    this._model = {
      nodes: [],
      links: []
    };
  }

  /**
   * Adds a node to the diagram
   * @param {Integer} id
   * @param {String} title  The title of the node
   * @param {Integer} x      X coordinate
   * @param {Integer} y      Y Coordinate
   * @param {Integer} width  Width
   * @param {Integer} height Height
   * @param {Any} others
   * @return {Node} The node created
   */
  addNode(id, title, x, y, width, height, others) {
    const newNode = new DiagramNode(id, title, x, y, width, height, others);
    newNode.addNodePort(title);
    this._model.nodes.push(newNode);
    return newNode;
  }

  deleteNode(node) {
    const index = this._model.nodes.indexOf(node);
    for (var j = 0; j < this._model.links.length; j++) {
      const currentLink = this._model.links[j];

      for (var i = 0; i < node.ports.length; i++) {
        const currentPort = node.ports[i];

        if (
          currentLink.from === currentPort.id ||
          currentLink.to === currentPort.id
        ) {
          this.deleteLink(currentLink);
          j--;
        }
      }
    }
    this._model.nodes.splice(index, 1);
  }

  clearCanvas() {
    this._model.nodes = [];
    this._model.links = [];
  }

  editNode(node, title) {
    let nodeIndex = this._model.nodes.indexOf(node);
    let newNode = this._model.nodes[nodeIndex];
    newNode.title = title;
  }

  deleteLink(link) {
    const index = this._model.links.indexOf(link);
    this._model.links.splice(index, 1);
  }

  /**
   * Adds a link between two ports
   * @param {Integer} from   Port id. Must be an out port
   * @param {Integer} to     Port id. Must be an in port
   * @param {Array}  points  Optional. Array of points to make the link represented as a segmented line
   */
  addLink(from, to, points = []) {
    this._model.links.push({
      id: this._model.links.length,
      from: from,
      to: to,
      positionFrom: {},
      positionTo: {},
      points
    });
  }

  /**
   * Serializes the diagram model into a JSON object
   * @return {Object} The diagram model
   */
  serialize() {
    return JSON.stringify(this._model);
  }

  /**
   * Load into the diagram model a serialized diagram
   * @param  {Object} serializedModel
   */
  deserialize(serializedModel) {
    this._model = JSON.parse(serializedModel);
  }
}

export default DiagramModel;
