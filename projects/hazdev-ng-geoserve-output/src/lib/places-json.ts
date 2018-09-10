import { FeatureCollection } from './feature-collection';

export interface PlacesJson {
  metadata: any;
  event: FeatureCollection;
  geonames: FeatureCollection;
}
