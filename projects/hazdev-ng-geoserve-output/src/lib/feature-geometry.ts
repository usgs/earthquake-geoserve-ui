export interface FeatureGeometry {
  coordinates: any[]; // For Point, number[], for Polygon, much deeper ...
  type: string;
}
