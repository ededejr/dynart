import LinearRectangleModel from "../models/linear/linear-rectangle";
import ModelBuilder from "../models/utilities/model-builder";

const ColorfulSquares = new LinearRectangleModel({
  count: 10,
  direction: 'inward',
  generateProps: () => ({
    ...ModelBuilder.getRandomRotationProps()
  })
});

export default ColorfulSquares;