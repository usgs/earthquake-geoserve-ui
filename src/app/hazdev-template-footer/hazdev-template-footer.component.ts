import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hazdev-template-footer',
  templateUrl: './hazdev-template-footer.component.html',
  styleUrls: ['./hazdev-template-footer.component.css']
})
export class HazdevTemplateFooterComponent implements OnInit {
  @Input() SITE_COMMONNAV: any[];

  constructor() { }

  ngOnInit() {
  }

}
