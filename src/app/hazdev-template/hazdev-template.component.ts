import { ChangeDetectorRef, Component, OnInit, OnDestroy, Input } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-hazdev-template',
  templateUrl: './hazdev-template.component.html',
  styleUrls: ['./hazdev-template.component.css']
})
export class HazdevTemplateComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  public href = '';

  @Input() TITLE: string;
  @Input() CONTACT = 'mailto:noreply@example.com';
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
  @Input() SITE_COMMONNAV: any[];
  @Input() SITE_SITENAV: any[];
  @Input() SITE_URL = 'http//localhost.localdomain';

  constructor (changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }
}
