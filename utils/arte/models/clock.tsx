import { ComponentProps } from "react";
import BaseModel, { BaseModelConfiguration } from './base-model';
import Colors from './utilities/colors';

export default class ClockModel extends BaseModel {
  configuration: ClockModel.Configuration;

  constructor(configuration: Partial<ClockModel.Configuration>) {
    super(configuration);
    this.configuration = Object.assign(
      this.getDefaultConfiguration(),
      configuration
    );
  }

  render() {
    return (
      <>
        {this.renderBackground()}
        {this.renderHands()}
      </>
    )
  }

  renderBackground() {
    const {
      props,
      getColor,
      generateProps
    } = this.configuration.background;

    const generatedProps = generateProps ? generateProps() : {};

    return (
      <rect 
        width={this.svgWidth} 
        height={this.svgHeight} 
        fill={getColor && getColor()}
        {...props} 
        {...generatedProps}
      />
    )
  }

  renderHands() {
    const { 
      props,
      getColor,
      generateProps,
      generateStyles 
    } = this.configuration.hands;

    const count = 2;
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

    return polylines;
  }

  private getDefaultConfiguration(): ClockModel.Configuration {
    return {
      hands: {
        generateProps: (index, count) => {
          const completion = (index / count);
          const percentComplete = completion * 100;

          return {
            points: `50,50 50,${percentComplete} ${percentComplete},50`,
            stroke: Colors.random.color()
          }
        }
      },
      background: {
        props: {
          fill: Colors.random.color(),
        }
      }
    }
  }
}

export declare namespace ClockModel {
  type DefaultComponentType = ComponentProps<'rect'>;

  export interface BackgroundConfiguration<T =  ComponentProps<'rect'>> {
    /**
     * Props applied to each layer
     */
     props?: T,
     /**
      * A function to generate colors per layer
      */
    getColor?: () => string,
     /**
      * Generate props per layer
      */
     generateProps?: () => T
  }

  export interface HandConfiguration<T = ComponentProps<'polyline'>> {
    /**
     * Props applied to each layer
     */
    props?: T,
    /**
     * A function to generate colors per layer
     */
     getColor?: (index: number, count: number) => string,
    /**
     * Generate props per layer
     */
    generateProps?: (index: number, count: number) => T
    /**
     * Generate styles
     */
    generateStyles?: (index: number, count: number) => React.SVGAttributes<any>['style']
  }

  export interface Configuration extends BaseModelConfiguration {
    background: BackgroundConfiguration,
    hands: HandConfiguration
  }
}