import LettersModel from "../models/letters";
import Colors from "../models/utilities/colors";
import Randomizer from "../utilities/randomizer";

const Letters = new LettersModel({
  size: 6,
  getBackgroundFill: () => Colors.random.color(),
  props: {
    fill: Randomizer.decide("black", "white"),
  },
  generateProps: () => ({
    opacity: Math.max(Randomizer.get(), 0.5)
  })
});

export default Letters;