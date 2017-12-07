import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hazdev-template-navigation',
  templateUrl: './hazdev-template-navigation.component.html',
  styleUrls: ['./hazdev-template-navigation.component.css']
})
export class HazdevTemplateNavigationComponent implements OnInit {
  @Input() sectionNavigation;
  @Input() siteNavigation;
  @Input() includeSearch: any[];

  constructor() { }

  ngOnInit() {
  }

  navItem (item: any): string {
    if (item.hasOwnProperty('header')) {
      return this.sectionNavItem(item);
    } else {
      return `<a href="${item.href}">${item.display}</a>`;
    }
  }

  sectionNavItem (item: any): string {
    const links = (item.links || []).map(this.navItem);

    return [
      '<section>',
        '<header>',
          this.navItem(item.header),
        '</header>',
        links.join(''),
      '</section>'
    ].join('');
  }
}
