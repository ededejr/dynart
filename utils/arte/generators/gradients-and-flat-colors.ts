import Randomizer from "../utilities/randomizer";
import LinearRectangleModel from "../models/linear/linear-rectangle";
import Colors from "../models/utilities/colors";
import ModelBuilder from "../models/utilities/model-builder";

const GradientsAndFlatColors = new LinearRectangleModel({
  count: 5,
  direction: 'inward',
  generateProps: () => {
    return {
      rx: ModelBuilder.percentageBelow(10),
      ry: ModelBuilder.percentageBelow(25),
      fill: Randomizer.decide(Colors.random.gradientUrl(), Colors.random.color(), 0.5),
      ...ModelBuilder.getRandomRotationProps()
    }
  }
});

export default GradientsAndFlatColors;