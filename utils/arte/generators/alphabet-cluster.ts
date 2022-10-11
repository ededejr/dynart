import LettersModel from "../models/letters";
import Colors from "../models/utilities/colors";

const AlphabetCluster = new LettersModel({
  size: 10,
  getBackgroundFill: () => `rgba(${Colors.random.hue(70)}, ${Colors.random.hue(70)}, ${Colors.random.hue(70)}, 0.5)`,
  getLetterFill: () => Colors.random.color(),
});

export default AlphabetCluster;