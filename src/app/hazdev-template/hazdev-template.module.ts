import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule
} from '@angular/material';

import { HazdevTemplateComponent } from './hazdev-template/hazdev-template.component';
import { HazdevTemplateFooterComponent } from './hazdev-template-footer/hazdev-template-footer.component';
import { HazdevTemplateHeaderComponent } from './hazdev-template-header/hazdev-template-header.component';
import { HazdevTemplateNavigationComponent } from './hazdev-template-navigation/hazdev-template-navigation.component';
import { HazdevTemplatePageComponent } from './hazdev-template-page/hazdev-template-page.component';

import { MenuService } from '../menu.service';


@NgModule({
  declarations: [
    HazdevTemplateComponent,
    HazdevTemplateFooterComponent,
    HazdevTemplateHeaderComponent,
    HazdevTemplateNavigationComponent,
    HazdevTemplatePageComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule
  ],
  providers: [
    MediaMatcher,
    MenuService
  ],
  exports: [
    HazdevTemplateComponent
  ]
})
export class HazdevTemplateModule { }
