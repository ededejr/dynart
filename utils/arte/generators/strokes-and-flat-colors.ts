import Randomizer from "../utilities/randomizer";
import LinearRectangleModel from "../models/linear/linear-rectangle";
import Colors from "../models/utilities/colors";
import ModelBuilder from "../models/utilities/model-builder";

const StrokesAndFlatColors = new LinearRectangleModel({
  count: 5,
  direction: 'inward',
  props: {
    fill: undefined
  },
  generateProps: () => {
    return {
      rx: ModelBuilder.percentageBelow(10),
      ry: ModelBuilder.percentageBelow(25),
      stroke: Colors.random.color(),
      strokeWidth: Randomizer.sample(20),
      ...ModelBuilder.getRandomRotationProps()
    }
  }
});

export default StrokesAndFlatColors;