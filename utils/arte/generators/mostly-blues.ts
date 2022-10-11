import Randomizer from "../utilities/randomizer";
import LinearRectangleModel from "../models/linear/linear-rectangle";
import Colors from "../models/utilities/colors";
import ModelBuilder from "../models/utilities/model-builder";

const MostlyBlues = new LinearRectangleModel({
  count: 20,
  direction: 'inward',
  generateProps: () => {
    return {
      rx: Randomizer.decide('100%', '0%', 0.1),
      ry: Randomizer.decide('100%', '0%', 0.2),
      ...ModelBuilder.getRandomRotationProps()
    }
  },
  getColor: () => Colors.random.color(undefined, 20, 255)
});

export default MostlyBlues;