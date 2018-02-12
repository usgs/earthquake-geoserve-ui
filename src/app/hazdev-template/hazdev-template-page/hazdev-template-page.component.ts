import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hazdev-template-page',
  templateUrl: './hazdev-template-page.component.html',
  styleUrls: ['./hazdev-template-page.component.css']
})
export class HazdevTemplatePageComponent implements OnInit {
  @Input() CONTACT: string;
  @Input() SOCIAL: string;
  @Input() TITLE: string;

  constructor() { }

  ngOnInit() {
  }

  getSocialHref (stub: string): string {
    return (stub
      .replace('{URL}', encodeURIComponent(window.location.toString()))
      .replace('{TITLE}', this.TITLE)
      .replace('{CONTACT}', this.CONTACT)
    );
  }
}
