import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hazdev-template-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css']
})
export class NavItemComponent implements OnInit {
  @Input() href: string;
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
