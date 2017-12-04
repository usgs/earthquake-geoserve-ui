import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // TODO, set other region variables
  admin: Region[];

  TITLE = 'Geoserve';

  NAVIGATION = [
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

  SITE_SITENAV = [
    {href: '/earthquakes/', display: 'Earthquakes'},
    {href: '/hazards/', display: 'Hazards'},
    {href: '/data/', display: 'Data & Products'},
    {href: '/learn/', display: 'Learn'},
    {href: '/monitoring/', display: 'Monitoring'},
    {href: '/research/', display: 'Research'}
  ];

  SITE_COMMONNAV = [
    {href: '/', display: 'Home'},
    {href: '/aboutus/', display: 'About Us'},
    {href: '/contactus/', display: 'Contacts'},
    {href: '/legal.php', display: 'Legal'}
  ];
}
