import { ComponentProps } from "react";
import BaseModel, { BaseModelConfiguration } from "../base-model";

export default abstract class LinearModel<T = BaseElement> extends BaseModel {
  abstract configuration: LinearModelConfiguration<T>;
  protected abstract buildLayerNodes(): JSX.Element[];

  render() {
    return <>{this.buildLayerNodes()}</>;
  }

  /**
   * Move a layer by scaling it's coordinates up or down,
   * depending on direction.
   * @param size The size to move a layer by.
   */
  protected moveLayer(size: number) {
    return this.isInwardsDirection ? this.shrinkTowardsCenter(size) : this.growOutwardsFromCenter(size);
  }

  /**
   * Determine if layers should move inward or outwards.
   */
  protected get isInwardsDirection() {
    return this.configuration.direction === 'inward';
  }

  /**
   * Move a layer inward by shrinking it's coordinates.
   * @param size The amount to shrink by.
   */
  protected shrinkTowardsCenter(size: number) {
    return (this.size - size) / 2;
  }

  /**
   * Move a layer outwards by growing it's coordinates.
   * @param size The amount to grow by.
   */
  protected growOutwardsFromCenter(size: number) {
    return (this.size + size) / 2;
  }
}

type BaseElement = ComponentProps<'rect'>;

export interface LinearModelConfiguration<T = BaseElement> extends BaseModelConfiguration {
    /**
     * The number of layers to render
     */
    count: number;
    /**
     * Direction of layer growth, inward towards the center,
     * or outwards
     */
    direction: 'inward' | 'outward',
    /**
     * A function to generate colors per layer
     */
    getColor?: (index: number, count: number) => string,
    /**
     * Props applied to each layer
     */
    props?: T,
    /**
     * Generate props per layer
     */
    generateProps?: (index: number, count: number) => T
    /**
     * Generate styles
     */
    generateStyles?: (index: number, count: number) => React.SVGAttributes<any>['style']
  }