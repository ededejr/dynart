import LettersModel from "../models/letters";
import Colors from "../models/utilities/colors";

const SymbolsCluster = new LettersModel({
  letters: "#@$%><+=!.-/?:&",
  size: 8,
  getBackgroundFill: () => `rgba(${Colors.random.hue(50)}, ${Colors.random.hue(50)}, ${Colors.random.hue(50)}, 0.5)`,
  getLetterFill: () => Colors.random.color(),
});

export default SymbolsCluster;