import LinearPolylineModel from "../models/linear/linear-polyline";
import Colors from "../models/utilities/colors";
import ModelBuilder from "../models/utilities/model-builder";
import Randomizer from "../utilities/randomizer";

const ORIGIN = { x: 50, y: 50 };

const DynamicColorfulPolygons = new LinearPolylineModel({
  count: 10,
  direction: 'inward',
  props: {
    strokeLinecap: 'round'
  },
  generateProps: () => {
    return {
      points: printCoordinates(generateCoordinates()),
      strokeWidth: Randomizer.sample(6),
    };
  },
  getColor: () => Colors.random.color()
});

function printCoordinates(coordinates: { x: number, y: number }[], arrow = false) {
  return coordinates.map(coordinate => `${Math.round(coordinate.x)},${Math.round(coordinate.y)}`).join(arrow ? '->' : ' ');
}

function generateCoordinates() {
  const array = new Array(Randomizer.sample(100)).fill(0);
  const coordinates = ModelBuilder.getRandomCoordinates();

  return array.map((_, index) => {
    switch (index) {
      case 0:
        return ORIGIN;
      case 1:
        return coordinates;
      case 2:
        return { x: coordinates.y, y: coordinates.x };
      default:
        return ModelBuilder.getRandomCoordinates()
    }
  });
}

export default DynamicColorfulPolygons;