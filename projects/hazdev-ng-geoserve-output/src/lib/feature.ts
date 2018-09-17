import { FeatureGeometry } from './feature-geometry';

export interface Feature {
  geometry: FeatureGeometry;
  id: number;
  properties: any;
  type: string;
}
