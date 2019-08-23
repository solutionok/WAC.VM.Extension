import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// tslint:disable-next-line: max-line-length
import { AppContextService, BaseDialogComponent, DialogOptions, DialogResult, DialogService } from '@microsoft/windows-admin-center-sdk/angular';
import { Subject } from 'rxjs';

export interface VnetDialogOptions extends DialogOptions {
    title: string;
    label: string;
}

export interface VnetDialogResult extends DialogResult {
    result: string;
}
@Component({
    selector: 'addvnetwork-component',
    templateUrl: './addvnetwork.component.html'
})

export class AddvnetworkComponent extends BaseDialogComponent<VnetDialogOptions, VnetDialogResult> implements OnInit {

    @Output() public doAdd: EventEmitter<any> = new EventEmitter()
    
    // public FormData: FormGroup;
    
    public vnetName = '';
    public vnetVlan = '';

    public addNew() {
        if(!this.vnetName || !this.vnetVlan) {
            return false;
        }
        
        this.doAdd.emit({vnetName: this.vnetName.toString(), vnetVlan:this.vnetVlan.toString()});
        
        this.hide({
            result: 'you closed the dialog!'
        });

        this.vnetName = '';
        this.vnetVlan = '';
    }


    public show(options: VnetDialogOptions): Subject<VnetDialogResult> {
        if (!options) {
            throw new Error('ConfirmationDialogComponent.show: Options are required to show the dialog.');
        }

        const result = super.show(options);

        return result;
    }

    /**
     * The method to call when the cancel button is clicked.
     */
    public onCancel(): void {
        this.hide({
            result: 'you canceled the dialog!'
        });
    }
    // tslint:disable-next-line: no-empty
    constructor(dialogService: DialogService, private appContextService: AppContextService) {
        super(dialogService);
    }

    // tslint:disable-next-line: no-empty
    public ngOnInit() { 
        // this.FormData = new FormGroup({
        //     'vnetName' : new FormControl(''),
        //     'vnetVlan' : new FormControl(''),
        // })
    }


}
