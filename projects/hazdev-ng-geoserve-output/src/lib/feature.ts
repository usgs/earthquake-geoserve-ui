import { FeatureGeometry } from './feature-geometry';

export interface Feature {
  type: string;
  id: number;
  geometry: FeatureGeometry;
  properties: any;
}
