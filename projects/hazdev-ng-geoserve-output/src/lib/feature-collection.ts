import { Feature } from './feature';

export interface FeatureCollection {
  type: string;
  count: number;
  features: Feature[];
}
