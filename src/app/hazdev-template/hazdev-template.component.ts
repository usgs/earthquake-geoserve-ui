import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hazdev-template',
  templateUrl: './hazdev-template.component.html',
  styleUrls: ['./hazdev-template.component.css']
})
export class HazdevTemplateComponent implements OnInit {
  public href = '';

  @Input() TITLE: string;
  @Input() CONTACT_URL = 'mailto:noreply@example.com';
  @Input() SOCIAL: any[] = [
    {
      display: 'Facebook',
      href: 'https://www.facebook.com/sharer.php?u={URL}',
      class: 'facebook'
    },
    {
      display: 'Twitter',
      href: 'https://twitter.com/intent/tweet?url={URL}&text=USGS%20%7C%20{TITLE}',
      class: 'twitter'
    },
    {
      display: 'Google',
      href: 'https://plusone.google.com/_/+1/confirm?url={URL}',
      class: 'google-plus'
    },
    {
      display: 'Email',
      href: '{CONTACT}?to=&subject={TITLE}&body={URL}',
      class: 'email'
    }
  ];
  @Input() NAVIGATION: any[];
  @Input() SITE_SITENAV: any[];
  @Input() SITE_COMMONNAV: any[];
  @Input() CONTENT: Component;

  constructor () { }

  ngOnInit() {
  }

  getSocialHref (stub: string): string {
    return (stub
      .replace('{URL}', escape(window.location.toString()))
      .replace('{TITLE}', this.TITLE)
      .replace('{CONTACT}', this.CONTACT_URL)
    );
  }
}
