import LettersModel from "../models/letters";
import Colors from "../models/utilities/colors";

const AlphabetCluster = new LettersModel({
  size: 10,
  getBackgroundFill: () => `rgba(${Colors.random.hue(10)}, ${Colors.random.hue(10)}, ${Colors.random.hue(10)}, 1)`,
  getLetterFill: () => Colors.random.color(),
});

export default AlphabetCluster;