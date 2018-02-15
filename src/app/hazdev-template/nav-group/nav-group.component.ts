import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hazdev-template-nav-group',
  templateUrl: './nav-group.component.html',
  styleUrls: ['./nav-group.component.css']
})
export class NavGroupComponent implements OnInit {
  @Input() href: string;
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
