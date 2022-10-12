import { ComponentProps } from 'react';
import ReactDOMServer from 'react-dom/server';
import { GradientNodes } from './utilities/gradients';

export default abstract class BaseModel {
  private $configuration: Configuration;
  protected history = new Map<string, JSX.Element>();
  protected size = 630;
  protected height = 630;
  protected width = 1200;

  // Support legacy methods 
  protected get svgWidth() {
    return this.width;
  }

  protected get svgHeight() {
    return this.height;
  }

  abstract render(): JSX.Element;

  constructor(options: BaseModelConfiguration) {
    this.$configuration = Object.assign(BaseModel.getDefaultConfiguration(), options);
  }

  /**
   * Get the model name.
   */
  get name() {
    // This doesn't work in production,
    // since the class name gets minified (sucks),
    // probably need something better but ugh.
    return this.constructor.name;
  }

  /**
   * Get the most recently generated node by this model.
   */
  get lastGenerated() {
    return this.history.get('last');
  }
 
  /**
   * Generate an SVG
   */
  generate = () => {
    const { borderRadius, backgroundColor, props } = this.$configuration.svgProperties;

    this.history.set('last',
      <svg 
        {...props}
        fill={backgroundColor}
        rx={borderRadius}
        height={this.height}
        width={this.width}
        viewBox={`0 0 ${this.width} ${this.height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {GradientNodes}
        </defs>
        {this.render()}
      </svg>
    );

    return this.lastGenerated as JSX.Element;
  };

  /**
   * Get the generated SVG as a string.
   */
  generateString(): string {
    return BaseModel.NodeToString(this.generate());
  }

  /**
   * Convert the latest generated model to a string.
   */
  toString() {
    const node = this.lastGenerated;
    return node ? BaseModel.NodeToString(node) : undefined;
  }

  static getDefaultConfiguration(): Configuration {
    return {
      svgProperties: {
        backgroundColor: 'transparent',
        borderRadius: '0',
      }
    }
  }

  static NodeToString(node: JSX.Element) {
    return ReactDOMServer.renderToStaticMarkup(node);
  }
}

interface Configuration {
  svgProperties: {
    /**
     * Background color of the SVG
     */
    backgroundColor: string;
    /**
     * Border radius of the SVG
     */
    borderRadius: string;
    /**
     * The size of the SVG
     */
    size?: number;
    /**
     * Additional props for the svg
     */
    props?: ComponentProps<'svg'>
  }
}
export type BaseModelConfiguration = Partial<Configuration>;