import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  DataTableModule,
  DetailsModule,
  DialogModule, 
  LayoutModule, 
  MasterViewModule, 
  PivotModule, 
  ResizerModule, 
  SmeFormsModule,
  SplitViewModule 
} from '@microsoft/windows-admin-center-sdk/angular';

import { DefaultComponent } from './default.component';
import { Routing } from './default.routing';
import { FormPanelComponent } from './form-panel/form-panel.component';

@NgModule({
  imports: [
    CommonModule,
    Routing,
    FormsModule,
    DataTableModule,
    DetailsModule,
    DialogModule,
    ReactiveFormsModule,
    LayoutModule,
    MasterViewModule, 
    PivotModule, 
    ResizerModule, 
    SmeFormsModule,
    SplitViewModule,
  ],
  declarations: [
    DefaultComponent,
    FormPanelComponent
  ]
})
export class DefaultModule { }
