import { faker } from '@faker-js/faker';
import Randomizer from "../../utilities/randomizer";
import { getGradient, getRandomGradientUrl, GradientKey } from './gradients';

class ColorModule {
  get random() {
    return {
      /**
       * Get a random hue
       * @see {@link randomHue}
       */
      hue: (max?: number) => this.randomHue(max),
      /**
       * Get a random color
       * @see {@link randomColor}
       */
      color: (...args: Parameters<typeof this.randomColor>) => this.randomColor(...args),
      /**
       * Get a random gradient url
       * @see {@link randomGradientUrl}
       */
      gradientUrl: () => this.randomGradientUrl(),
    };
  }

  /**
   * Get a random hue value
   * @returns 
   */
  private randomHue(max?: number) {
    return Randomizer.sample(max || 255);
  }

  /**
   * Get a random color
   * @param red 
   * @param green 
   * @param blue 
   * @returns 
   */
  private randomColor(red?: number, green?: number, blue?: number) {
    return faker.internet.color(
      red || this.randomHue(),
      green || this.randomHue(),
      blue || this.randomHue()
    );
  }

  /**
   * Get a random gradient
   * @returns 
   */
  private randomGradientUrl() {
    return getRandomGradientUrl();
  }

  /**
   * Get a gradient by it's id.
   * @param id 
   * @returns 
   */
  gradient(id: GradientKey) {
    return getGradient(id);
  }
}

declare namespace ColorModule {
}

const Colors = new ColorModule();
export default Colors;