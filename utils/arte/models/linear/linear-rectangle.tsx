import { ComponentProps } from "react";
import LinearModel, { LinearModelConfiguration } from "./base-linear-model";
import Colors from '../utilities/colors';
import ModelBuilder from '../utilities/model-builder';

export default class LinearRectangleModel extends LinearModel<Props> {
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
    
    let rects = [];

    for (let index = 0; index < count; index++) {
      const calculatedWidth = this.svgWidth * ((1 / count) * (index + 1));
      const calculatedHeight = this.svgHeight * ((1 / count) * (index + 1));
      const opacity = ModelBuilder.numToPercent((1 - index / count) * 100);
      const fill = getColor && getColor(index, count);
      const generatedProps = generateProps ? generateProps(index, count) : {};
      const generatedStyle = generateStyles ? generateStyles(index, count) : {};
  
      rects.push((
        <rect
          key={index}
          x={ModelBuilder.numToPercent(this.moveLayer(calculatedWidth))}
          y={ModelBuilder.numToPercent(this.moveLayer(calculatedHeight))}
          height={ModelBuilder.numToPercent(calculatedHeight)}
          width={ModelBuilder.numToPercent(calculatedWidth)}
          fill={fill}
          style={{
            opacity,
            ...generatedStyle
          }}
          {...props}
          {...generatedProps}
        />
      ));
    }
    
    return rects.reverse();
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

type Props = ComponentProps<'rect'>;
type Configuration = LinearModelConfiguration<Props>;