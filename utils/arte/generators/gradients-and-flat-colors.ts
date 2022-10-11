import Randomizer from "../utilities/randomizer";
import LinearRectangleModel from "../models/linear/linear-rectangle";
import Colors from "../models/utilities/colors";
import ModelBuilder from "../models/utilities/model-builder";

const GradientsAndFlatColors = new LinearRectangleModel({
  count: 5,
  direction: 'inward',
  generateProps: (index, count) => {
    const isLast = index === count - 1;

    return {
      rx: isLast ? 0 : ModelBuilder.percentageBelow(10),
      ry: isLast ? 0 : ModelBuilder.percentageBelow(25),
      fill: Randomizer.decide(Colors.random.gradientUrl(), Colors.random.color(), 0.5),
      ...ModelBuilder.getRandomRotationProps()
    }
  }
});

export default GradientsAndFlatColors;