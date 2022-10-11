import Randomizer from "../../utilities/randomizer";

export class ModelBuilderModule {
  percentage() {
    return this.numToPercent(Math.max(Randomizer.sample(100), 0));
  }

  percentageBelow(max: number) {
    return this.numToPercent(Math.max(Randomizer.sample(max), 0));
  }

  getRandomTransitionType() {
    return Randomizer.decide('spring', 'tween');
  }

  getRandomRotation(value?: number) {
    const axisDecider = Randomizer.sample(3);
    let axis;

    switch (axisDecider) {
      case 0:
        axis = 'rotateX';
        break;
      case 1:
        axis = 'rotateY';
        break;
      default:
        axis = 'rotateZ';
        break;
    }

    return `${axis}(${value || Randomizer.sample(360)}deg)`;
  }

  getRandomRotationProps(transformOrigin: string = 'center') {
    return {
      style: {
        transform: this.getRandomRotation(),
        transformOrigin
      }
    };
  }

  getRandomAngle(max?: number) {
    return Randomizer.sample(max || 360);
  }

  numToPercent(n: number) {
    return `${n}%`;
  }

  pointsArrayToString(coordinates: ModelBuilderModule.Coordinate[], withArrow = false) {
    return coordinates.map(coordinate => `${Math.round(coordinate.x)},${Math.round(coordinate.y)}`).join(withArrow ? '->' : ' ');
  }

  getRandomCoordinates(): ModelBuilderModule.Coordinate {
    return {
      x: Randomizer.sample(100),
      y: Randomizer.sample(100)
    };
  }
}

export declare namespace ModelBuilderModule {
  export interface Coordinate {
    x: number, 
    y: number
  }
}

const ModelBuilder = new ModelBuilderModule();
export default ModelBuilder;