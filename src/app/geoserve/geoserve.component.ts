import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

import * as L from 'leaflet';
import { LocationMapComponent } from 'location-input';
import { OverlaysService } from 'geoserve-output';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-geoserve',
  templateUrl: './geoserve.component.html',
  styleUrls: ['./geoserve.component.css']
})
export class GeoserveComponent implements AfterViewInit, OnDestroy {

  @ViewChild('location-map')
  locationInput: LocationMapComponent;

  subscription = new Subscription();

  constructor (
    public overlaysService: OverlaysService
  ) { }


  ngAfterViewInit() {
    this.subscription.add(this.overlaysService.overlays.subscribe((layers) => {
      this.addOverlays(layers);
    }));

    // Get region overlays
    this.overlaysService.getOverlays();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Add overlays to the location map.
   *
   * @param layers
   */
  addOverlays (layers) {
    const layerControl = this.locationInput.layerControl;

    // add overlays
    for (const name in layers) {
      if (layers.hasOwnProperty(name)) {
        layerControl.addOverlay(layers[name], name);
      }
    }
  }

}
