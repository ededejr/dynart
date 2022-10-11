import LinearRectangleModel from "../models/linear/linear-rectangle";
import Colors from "../models/utilities/colors";
import ModelBuilder from "../models/utilities/model-builder";

const RandomBorderRadiusColors = new LinearRectangleModel({
  count: 5,
  direction: 'inward',
  generateProps: () => {
    return {
      rx: ModelBuilder.percentage(),
      ry: ModelBuilder.percentage(),
      fill: Colors.random.gradientUrl(),
      ...ModelBuilder.getRandomRotationProps()
    }
  }
});

export default RandomBorderRadiusColors;