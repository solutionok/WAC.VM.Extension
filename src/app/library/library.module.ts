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

import { AddlibraryComponent } from './add/addlibrary.component';
import { LibraryComponent } from './library.component';

const LibraryRoutes: Routes = [
    {
        path: '',
        component: LibraryComponent
    },
    {
        path: 'add',
        component: AddlibraryComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [
        LibraryComponent, 
        AddlibraryComponent
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
    exports: [LibraryComponent]
})
export class DefaultModule { }
