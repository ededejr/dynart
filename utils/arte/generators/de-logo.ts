import DeLogoModel from "../models/de-logo";
import Colors from "../models/utilities/colors";

const DeLogo = new DeLogoModel({
  background: {
    generateProps: () => ({
      rx: 0,
      x: 0,
      y: 0,
      width: '100%',
      height: '100%',
    }),
    getColor: () => Colors.random.color()
  }
});

export default DeLogo;