import * as Generators from './generators';
import BaseModel from './models/base-model';

export interface ArtGenerator {
  /**
   * The name of the generator
   */
  name: string,
  /**
   * Indicates if the generator is ready
   * for use in production
   */
  finished: boolean,
  /**
   * The underlying model of the generator
   */
  model: BaseModel
}

const GeneratorsArray: ArtGenerator[] = Object.keys(Generators).map((name) => ({ 
  name,
  // @todo, expand to more designs
  finished: [
    'Letters', 
    'AlphabetCluster', 
    'SymbolsCluster',
    'Clocks',
    'ColorfulCircles',
    'ColorfulSquares',
    'MostlyBlues',
    'DeLogo',
    'RandomBorderRadiusColors'
  ].includes(name),
  model: Generators[name as keyof typeof Generators]  
}));

const AvailableGenerators = process.env.NODE_ENV === 'development' ? GeneratorsArray : GeneratorsArray.filter(ag => ag.finished);

export {
  GeneratorsArray,
  Generators,
  BaseModel,
  AvailableGenerators,
}