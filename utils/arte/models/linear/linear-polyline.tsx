import { ComponentProps } from "react";
import LinearModel, { LinearModelConfiguration } from "./base-linear-model";
import Colors from '../utilities/colors';

export default class LinearPolylineModel extends LinearModel<Props> {
  configuration: Configuration;

  constructor(configuration: Partial<Configuration>) {
    super(configuration);
    this.configuration = Object.assign(
      this.getDefaultConfiguration(),
      configuration
    );
  }

  buildLayerNodes() {
    const { 
      count, 
      getColor, 
      props,  
      generateProps, 
      generateStyles 
    } = this.configuration;
    
    let polylines = [];

    for (let index = 0; index < count; index++) {
      const generatedProps = generateProps ? generateProps(index, count) : {};
      const generatedStyle = generateStyles ? generateStyles(index, count) : {};
      const completion = (index / count);
      const percentComplete = completion * 100;
  
      polylines.push((
        <polyline
          key={index}
          // Default points meant to be overwritten by model definition
          points={`50,50 50,${percentComplete} ${percentComplete},50`}
          stroke={getColor && getColor(index, count)}
          style={generatedStyle}
          {...props}
          {...generatedProps}
        />
      ));
    }
    
    return polylines.reverse();
  }

  private getDefaultConfiguration(): Configuration {
    return {
      count: 10,
      direction: 'inward',
      getColor: (index, count) => {
        const getHue = () => Colors.random.hue(((1 - (index/count)) * 255))
        return Colors.random.color(getHue(), getHue(), getHue());
      },
    }
  }
}

type Props = ComponentProps<'polyline'>;
type Configuration = LinearModelConfiguration<Props>;