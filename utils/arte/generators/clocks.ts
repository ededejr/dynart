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
    generateProps: (index, count) => {
      const origin = {x: 50, y: 50};
      const coordinates = { ...origin };

      const limit = index === 0 ? 50 : 40;
      coordinates.x = 20 + Randomizer.sample(limit);
      coordinates.y = 50 + (Randomizer.decide(1, -1) * (Randomizer.sample(20) + 10));

      return {
        points: printCoordinates([origin, coordinates]),
      };
    }
  },
  background: {
    generateProps: () => ({
      rx: ModelBuilder.percentage(),
      stroke: Colors.random.color(),
      x: 5,
      y: 5,
      width: '90%',
      height: '90%',
    }),
    getColor: () => Colors.random.color()
  }
});

function printCoordinates(coordinates: { x: number, y: number }[], arrow = false) {
  return coordinates.map(coordinate => `${coordinate.x},${coordinate.y}`).join(arrow ? '->' : ' ');
}

export default Clocks;