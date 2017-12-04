import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Geoserve';

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
    });
  }
}
