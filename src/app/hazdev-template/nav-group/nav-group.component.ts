import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'hazdev-template-nav-group',
  templateUrl: './nav-group.component.html',
  styleUrls: ['./nav-group.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavGroupComponent implements OnInit {
  @Input() href: string;
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
