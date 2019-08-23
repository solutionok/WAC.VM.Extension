import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseDialogComponent, DialogOptions, DialogResult, DialogService } from '@microsoft/windows-admin-center-sdk/angular';
import { Subject } from 'rxjs';

export interface AdapterDialogOptions extends DialogOptions {
    title: string;
    label: string;
}

export interface AdapterDialogResult extends DialogResult {
    result: string;
}

@Component({
    selector: 'adapterPanel',
    templateUrl: './adapter-modal.component.html',
    styleUrls: ['./adapter-modal.component.css']
})

export class AdapterModalComponent extends BaseDialogComponent<AdapterDialogOptions, AdapterDialogResult> {
    @Output() public doAddAdapter: EventEmitter<any> = new EventEmitter()
    public adapterType = [{ id: 1, label: 'Default' }];
    public adapterTypeForm: FormGroup;
    public adapterTypeValue = 1;

    /**
     * Initializes a new instance of the ConfirmationDialogComponent class.
     */
    constructor(dialogService: DialogService) {
        super(dialogService);
        this.adapterTypeForm = new FormGroup({
            'adapterType' : new FormControl(this.adapterTypeValue)
        })
    }

    public addNew() {
        this.doAddAdapter.emit(this.adapterTypeValue);
        
        this.hide({
            result: 'you closed the dialog!'
        });
    }
    /**
     * Shows the dialog.
     *
     * @param options The options for the dialog.
     * @return The dialog result subject.
     */
    public show(options: AdapterDialogOptions): Subject<AdapterDialogResult> {
        if (!options) {
            throw new Error('ConfirmationDialogComponent.show: Options are required to show the dialog.');
        }

        const result = super.show(options);

        return result;
    }

    /**
     * The method to call when the confirm button is clicked.
     */
    public onClose(): void {
        this.hide({
            result: 'you closed the dialog!'
        });
    }

    /**
     * The method to call when the cancel button is clicked.
     */
    public onCancel(): void {
        this.hide({
            result: 'you canceled the dialog!'
        });
    }
}
