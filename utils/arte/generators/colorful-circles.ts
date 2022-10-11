import LinearRectangleModel from "../models/linear/linear-rectangle";
import ModelBuilder from "../models/utilities/model-builder";

const ColorfulCircles = new LinearRectangleModel({
  count: 15,
  direction: 'inward',
  generateProps: () => {
    return {
      rx: '100%',
      ry: '100%',
      ...ModelBuilder.getRandomRotationProps()
    }
  }
});

export default ColorfulCircles;