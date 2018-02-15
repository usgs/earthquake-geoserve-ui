import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-hazdev-template-navigation',
  templateUrl: './hazdev-template-navigation.component.html',
  styleUrls: ['./hazdev-template-navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HazdevTemplateNavigationComponent implements OnInit {
  @Input() NAVIGATION: any[];
  @Input() SITE_SITENAV: any[];
  @Input() SITE_URL: string;

  constructor() { }

  ngOnInit() {
  }

}
