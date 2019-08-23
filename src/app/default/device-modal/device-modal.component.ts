import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// tslint:disable-next-line: max-line-length
import { AppContextService, BaseDialogComponent, DialogOptions, DialogResult, DialogService } from '@microsoft/windows-admin-center-sdk/angular';
import { Subject } from 'rxjs';

export interface AdapterDeviceDialogOptions extends DialogOptions {
    title: string;
    label: string;
}

export interface AdapterDeviceDialogResult extends DialogResult {
    result: string;
}

@Component({
    selector: 'devicePanel',
    templateUrl: './device-modal.component.html',
    styleUrls: ['./device-modal.component.css']
})

export class DeviceModalComponent extends BaseDialogComponent<AdapterDeviceDialogOptions, AdapterDeviceDialogResult> implements OnInit {
    @Output() public doAddDevice: EventEmitter<any> = new EventEmitter()
    @Input() public devices: any
    public AdapterForm: FormGroup;
    public hddcheck = false
    public hddcount = 0
    public dvdcheck = false
    public dvdcount = 0

    public addNew() {
        const v = this.AdapterForm.value
        
        if(!v.hddcheck&&!v.dvdcheck) {
            this.appContextService.notification.alert('You should choose one more any device', 0, 'Warning');
            return;
        }
        
        if(!v.hddcount&&!v.dvdcount) {
            this.appContextService.notification.alert('You should choose one more any device', 0, 'Warning');
            return;
        }
        
        this.devices.hdd = v.hddcheck && v.hddcount ? v.hddcount : 0
        this.devices.dvd = v.dvdcheck && v.dvdcount ? v.dvdcount : 0

        this.doAddDevice.emit(this.devices);
        
        this.resetForm()
        this.hide({
            result: 'you closed the dialog!'
        });
    }
    public resetForm() {
        this.AdapterForm.reset()
        this.hddcheck = false
        this.hddcount = 0
        this.dvdcheck = false
        this.dvdcount = 0
    }
    public show(options: AdapterDeviceDialogOptions): Subject<AdapterDeviceDialogResult> {
        if (!options) {
            throw new Error('ConfirmationDialogComponent.show: Options are required to show the dialog.');
        }

        const result = super.show(options);

        this.resetForm()
        return result;
    }

    /**
     * The method to call when the confirm button is clicked.
     */
    public onClose(): void {
        this.resetForm()
        this.hide({
            result: 'you closed the dialog!'
        });
    }

    /**
     * The method to call when the cancel button is clicked.
     */
    public onCancel(): void {
        this.resetForm()
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
        this.AdapterForm = new FormGroup({
            'hddcheck' : new FormControl(this.hddcheck),
            'hddcount' : new FormControl(this.hddcount),
            'dvdcheck' : new FormControl(this.dvdcheck),
            'dvdcount' : new FormControl(this.dvdcount),
        })
        console.log(this.AdapterForm)
    }

}
