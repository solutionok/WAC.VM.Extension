import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// import { FormControl, FormGroup } from '@angular/forms';
import {
    ActionsModule, 
    DataTableModule,
    DetailsModule, 
    DialogModule,
    IconModule,
    MasterViewModule,
    SmeFormsModule, 
    TooltipModule
} from '@microsoft/windows-admin-center-sdk/angular';
// } from '@microsoft/windows-admin-center-sdk/angular';
import { DefaultComponent } from './overview.component';
import { Routing } from './overview.routing';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    DialogModule,
    IconModule,
    MasterViewModule,
    Routing,
    ActionsModule, 
    DetailsModule, 
    SmeFormsModule, 
    TooltipModule
  ],
  declarations: [
    DefaultComponent
  ]
})
export class DefaultModule { }
