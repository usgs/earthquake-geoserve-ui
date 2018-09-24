import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  NAVIGATION = [
    {
      header: {
        display: 'Geoserve Web Services',
        href: '/ws/geoserve/index.php'
      },
      links: [
        { href: '/ws/geoserve/places.php', display: 'Places Service' },
        { href: '/ws/geoserve/regions.php', display: 'Regions Service' },
        { href: '/ws/geoserve/layers.php', display: 'Layers Service' }
      ]
    },
    { href: '/', display: 'Interactive Interface' }
  ];

  SITE_COMMONNAV = [
    { href: '/', display: 'Home' },
    { href: '/aboutus/', display: 'About Us' },
    { href: '/contactus/', display: 'Contacts' },
    { href: '/legal.php', display: 'Legal' }
  ];

  SITE_SITENAV = [
    { href: '/earthquakes/', display: 'Earthquakes' },
    { href: '/hazards/', display: 'Hazards' },
    { href: '/data/', display: 'Data & Products' },
    { href: '/learn/', display: 'Learn' },
    { href: '/monitoring/', display: 'Monitoring' },
    { href: '/research/', display: 'Research' }
  ];

  TITLE = 'Geoserve';
}
