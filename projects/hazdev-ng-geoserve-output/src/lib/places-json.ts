import { FeatureCollection } from './feature-collection';

export interface PlacesJson {
  event: FeatureCollection;
  geonames: FeatureCollection;
  metadata: any;
}
