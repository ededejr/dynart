import ClockModel from "../models/clock";
import Colors from "../models/utilities/colors";
import ModelBuilder from "../models/utilities/model-builder";
import Randomizer from "../utilities/randomizer";

const Clocks = new ClockModel({
  hands: {
    props: {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    getColor: () => {
      return Colors.random.color()
    },
    generateProps: (_, width, height) => {
      const origin = {x: width/2, y: height/2};
      const coordinates = { ...origin };

      // Do not use Randomizer here to increase variance
      coordinates.x = Math.floor(Math.random() * width * 0.8);
      coordinates.y = Math.floor(Math.random() * height * 0.8);

      return {
        points: printCoordinates([origin, coordinates]),
        strokeWidth: 7,
      };
    }
  },
  background: {
    generateProps: () => ({
      rx: 0,
      stroke: Colors.random.color(),
      x: 0,
      y: 0,
      width: '100%',
      height: '100%',
    }),
    getColor: () => Colors.random.color()
  }
});

function printCoordinates(coordinates: { x: number, y: number }[], arrow = false) {
  return coordinates.map(coordinate => `${coordinate.x},${coordinate.y}`).join(arrow ? '->' : ' ');
}

export default Clocks;