import { Component } from '@angular/core';

import { Region } from './region';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // TODO, set other region variables
  admin: Region[];

  title = 'Geoserve';
  sectionNavigation = [
    {'href': '/ws/geoserve/index.php', 'display': 'Geoserve'},
    {
      header: {href: '/ws/geoserve/services.php', display: 'Geoserve Documentation'},
      links: [
        {href: '/ws/geoserve/places.php', display: 'Places Service'},
        {href: '/ws/geoserve/regions.php', display: 'Regions Service'},
        {href: '/ws/geoserve/layers.php', display: 'Layers Service'}
      ]
    }
  ];
  siteNavigation = [
    {href: '/earthquakes/', display: 'Earthquakes'},
    {href: '/hazards/', display: 'Hazards'},
    {href: '/data/', display: 'Data &amp; Products'},
    {href: '/learn/', display: 'Learn'},
    {href: '/monitoring/', display: 'Monitoring'},
    {href: '/research/', display: 'Research'}
  ];
  includeSearch = true;

  handleSearch (event) {
    // TODO use the servies, instead of fetch
    const baseUrl = 'https://earthquake.usgs.gov/ws/geoserve';

    fetch(`${baseUrl}/places.json?latitude=${event.latitude}&longitude=${event.longitude}&type=event`).then((response) => {
      return response.json();
    }).then((json) => {
      console.log('places', json);
    });

    fetch(`${baseUrl}/regions.json?latitude=${event.latitude}&longitude=${event.longitude}`).then((response) => {
      return response.json();
    }).then((json) => {
      console.log('regions', json);

      this.admin = json.admin.features[0];
      // TODO, set other regions
    });
  }
}
