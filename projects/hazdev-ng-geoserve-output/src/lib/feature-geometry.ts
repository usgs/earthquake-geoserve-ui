export interface FeatureGeometry {
  type: string;
  coordinates: any[]; // For Point, number[], for Polygon, much deeper ...
}
