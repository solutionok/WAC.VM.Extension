import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    ActionsModule, 
    DataTableModule,
    DetailsModule, 
    DialogModule,
    IconModule,
    MasterViewModule,
    PivotModule,
    SmeFormsModule, 
    TooltipModule
} from '@microsoft/windows-admin-center-sdk/angular';

import { AddvnetworkComponent } from './add/addvnetwork.component';
import { VnetworkComponent } from './vnetwork.component';

const LibraryRoutes: Routes = [
    {
        path: '',
        component: VnetworkComponent
    },
    {
        path: 'add',
        component: AddvnetworkComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [
        VnetworkComponent, 
        AddvnetworkComponent
    ],
    imports: [
        CommonModule,
        ActionsModule, 
        DataTableModule,
        DetailsModule, 
        DialogModule,
        IconModule,
        MasterViewModule,
        PivotModule,
        SmeFormsModule, 
        FormsModule, 
        ReactiveFormsModule,
        TooltipModule,
        RouterModule.forChild(LibraryRoutes)
    ],
    exports: [VnetworkComponent]
})
export class DefaultModule { }
