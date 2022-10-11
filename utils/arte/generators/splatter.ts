import LinearPolylineModel from "../models/linear/linear-polyline";
import Colors from "../models/utilities/colors";
import ModelBuilder from "../models/utilities/model-builder";
import Randomizer from "../utilities/randomizer";

const ORIGIN = { x: 50, y: 50 };

/**
 * Side effect of experimenting with Poly lines
 */
const Splatter = new LinearPolylineModel({
  count: 30,
  direction: 'inward',
  generateProps: () => {
    const coordinates = { x: Randomizer.sample(100), y: Randomizer.sample(100) };

    return {
      points: ModelBuilder.pointsArrayToString([ORIGIN, coordinates]),
      strokeDasharray: Randomizer.sample(100),
      strokeWidth: Randomizer.sample(10),
      strokeLinecap: Randomizer.decide('round', 'butt')
    };
  },
  getColor: () => Colors.random.color()
});

export default Splatter;