import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  DetailsModule,
  DialogModule, 
  LayoutModule, 
  MasterViewModule, 
  PivotModule, 
  ResizerModule, 
  SmeFormsModule,
  SplitViewModule 
} from '@microsoft/windows-admin-center-sdk/angular';
import { AdapterModalComponent } from './adapter-modal/adapter-modal.component';
import { DefaultComponent } from './default.component';
import { Routing } from './default.routing';
import { DeviceModalComponent } from './device-modal/device-modal.component';
import { FormPanelComponent } from './form-panel/form-panel.component';

@NgModule({
  imports: [
    CommonModule,
    Routing,
    FormsModule,
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
    FormPanelComponent,
    AdapterModalComponent,
    DeviceModalComponent
  ]
})
export class DefaultModule { }
