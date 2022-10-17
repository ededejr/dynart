import { ComponentProps } from "react";
import BaseModel, { BaseModelConfiguration } from "./base-model";

export default class LettersModel extends BaseModel {
  configuration: Configuration;
  letters: string;

  constructor(configuration: Partial<Configuration>) {
    super(configuration);
    const defaultConfiguration = this.getDefaultConfiguration();

    if (configuration?.props) {
      Object.assign(configuration.props, defaultConfiguration.props);
    }

    this.configuration = Object.assign(defaultConfiguration, configuration)
    this.letters = this.configuration.letters;
  }

  private getRandomLetter() {
    return this.letters[Math.floor(Math.random() * this.letters.length)];
  }

  private chunk(array: any[], size: number) {
    const chunked = [];
    let index = 0;
    while (index < array.length) {
      chunked.push(array.slice(index, (index += size)));
    }
    return chunked;
  }

  render() {
    const { 
      size, 
      generateProps,
      getBackgroundFill, 
      getLetterFill, 
      props 
    } = this.configuration;

    const count = size * size;
    const letterBoxes = [];

    const generatedProps = generateProps ? generateProps() : {};

    // Scale the size of the box down 
    // to introduce padding
    const scale = 0.85;
    const letterWidth = (this.svgWidth * scale)/size;
    const letterHeight = (this.svgHeight * scale)/size;

    // Determine padding before drawing coordinates
    const paddingHorizontal = (this.svgWidth * (1 - scale))/2;
    const paddingVertical = (this.svgHeight * (1 - scale))/2;

    // Generate letters to draw
    const letters = new Array(count).fill(null).map((_, index) => {
      const letter = this.getRandomLetter();
      return { key: `${index}-${letter}`, letter };
    });

    // Split letters into chunks equal to the size of a row
    const chunks = this.chunk(letters, size);

    // For each row, draw out
    for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
      const chunk = chunks[chunkIndex];

      // For each letter in the row, draw and shift based on index
      for (let i = 0; i < chunk.length; i++) {
        const { key, letter } = chunk[i];

        letterBoxes.push(
          <text 
            key={key}
            x={paddingHorizontal + (letterWidth * (i % size)) + (letterWidth / 2)}
            y ={paddingVertical + (letterHeight * chunkIndex) + (letterHeight / 2)}
            fill={getLetterFill && getLetterFill(i, count)}
            // As we approach infinity we scale the font size based on the area of the
            // letter's container. Unfortunately as we approach 0, this does not give the desired
            // effect. As such we take the min of the two approaches and use that.
            fontSize={Math.min(0.05 * (letterWidth * letterHeight), 0.5 * letterWidth)}
            {...props}
            {...generatedProps}
          >
            {letter}
          </text>
        );
      }
    }

    return (
      <>
        <rect 
          x={0}
          y={0}
          rx={2}
          width={this.svgWidth} 
          height={this.svgHeight} 
          fill={getBackgroundFill ? getBackgroundFill() : "black"}
        />
        {letterBoxes}
      </>
    );
  }

  private getDefaultConfiguration(): Configuration {
    return {
      size: 4,
      letters: "abcdefghijklmnopqrstuvwxyz",
      getLetterFill: () => "white",
      props: {
        style: {
          textTransform: "uppercase",
          textAnchor: "middle",
          dominantBaseline: "middle",
        }
      }
    };
  }
}

interface Configuration<T = ComponentProps<'text'>> extends BaseModelConfiguration {
  /**
   * Size of generated grid. 
   * Total = size * size
   */
  size: number;
  /**
   * Allowed letters
   */
  letters: string;
  /**
   * Props applied to each letter
   */
  props?: T,
  /**
  * A function to generate colors per letter
  */
  getLetterFill?: (index: number, count: number) => string,
  /**
  * A function to generate for the background
  */
  getBackgroundFill?: () => string,
  /**
  * Generate props per layer
  */
  generateProps?: () => T
}