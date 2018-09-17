import { Feature } from './feature';

export interface FeatureCollection {
  count: number;
  features: Feature[];
  type: string;
}
