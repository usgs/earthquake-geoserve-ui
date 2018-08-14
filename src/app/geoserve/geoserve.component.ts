import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { OverlaysService } from 'geoserve-output';
import { LocationMapComponent } from 'hazdev-ng-location-view';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-geoserve',
  templateUrl: './geoserve.component.html',
  styleUrls: ['./geoserve.component.css']
})
export class GeoserveComponent implements AfterViewInit, OnDestroy {
  @ViewChild(LocationMapComponent)
  locationInput: LocationMapComponent;

  subscription = new Subscription();

  constructor(public overlaysService: OverlaysService) {}

  ngAfterViewInit() {
    this.subscription.add(
      this.overlaysService.overlays$.subscribe(layers => {
        this.addOverlays(layers);
      })
    );

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
  addOverlays(layers) {
    const layerControl = this.locationInput.layerControl;

    // add overlays
    for (const name in layers) {
      if (layers.hasOwnProperty(name)) {
        layerControl.addOverlay(layers[name], name);
      }
    }
  }
}
