import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    AppContextService, 
    ConfirmationDialogOptions, 
    ConfirmationDialogResult, 
    DialogService
} from '@microsoft/windows-admin-center-sdk/angular';

import { FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ExtensionSettings } from './../app.settings';
import { VnetDialogOptions, VnetDialogResult } from './add/addvnetwork.component';

@Component({
    selector: 'vnetwork',
    templateUrl: './vnetwork.component.html'
})
export class VnetworkComponent implements OnInit {
    public searchString = ''
    public searchString1 = ''
    public active = false;
    public groupActive = false;
    public selection = null;
    
    public selectedVnetwork = null
    public vnetworkData = []
    public actionButtons = [
      {id: 'add', text: 'Add', icon: 'sme-icon-add'},
      {id: 'remove', text: 'Remove', icon: 'sme-icon-delete'}
    ]

    public addVnet(netdata){
        this.appContextService.settingsManager
        .getExtensionApplicationSettings(ExtensionSettings)
        .pipe( take(1) )
        .subscribe( settings => {
            let ad = {
                'name' : netdata.vnetName,
                'vlanid' : netdata.vnetVlan
            };

            let vd = JSON.parse(JSON.stringify(this.vnetworkData));
            vd.push(ad)
            this.vnetworkData = vd;

            let sd = JSON.parse(JSON.stringify(settings.vnetworkData));
            sd.push(ad)
            settings.vnetworkData = sd;

            return settings.save();
        });

        
        this.appContextService.notification.alert('A virtual network added', 0, 'Success');
    }


    public doAction(id: any) {
        if (id === 'add') {
          
            this.dialogService.show<VnetDialogOptions, VnetDialogResult>('addvnet-dialog', {
                title: 's',
                label: 's'
            }).subscribe();
        } else if (id === 'remove') {
            if (this.selectedVnetwork) {
                this.dialogService.show<ConfirmationDialogOptions, ConfirmationDialogResult>('confirmation-dialog', {
                    cancelButtonText: 'Cancel',
                    confirmButtonText: 'Yes, Remove it!',
                    message: 'This action cannot be undone!',
                    title: 'Are you sure?'
                }).subscribe(() => {
                    this.removeVnetwork()
                    setTimeout(() => {
                        this.appContextService.notification.alert('A Virtual Network removed correctly!', 0, 'Success');
                    },         500)
                });
            }
        }else if(id === 'back'){
            this.router.navigateByUrl('/');
        }
    }

    public removeVnetwork() {
        console.log(this.selectedVnetwork)
        this.appContextService.settingsManager
        // get the settings into the type for the versionedObject extension we defined
        .getExtensionApplicationSettings(ExtensionSettings)
        .pipe( take(1) )
        .subscribe( settings => {
            let datas = []
            let saveddata = this.vnetworkData
            
            for (let i in saveddata) {
                // tslint:disable-next-line: triple-equals
                if (saveddata[i]['vlanid'] === this.selectedVnetwork.vlanid || !saveddata[i]['vlanid']) {
                    continue
                }

                datas.push(JSON.parse(JSON.stringify(saveddata[i])))
            }
            this.selectedVnetwork = null;
            settings.vnetworkData = datas;
            this.vnetworkData = datas;

            return settings.save();

        })
    }

    public loadVnetworkList() {
        this.vnetworkData = []
        this.appContextService.settingsManager
        .getExtensionApplicationSettings(ExtensionSettings)
        .pipe( take(1) )
        .subscribe( settings => {
            this.vnetworkData = settings.vnetworkData.length ? JSON.parse(JSON.stringify(settings.vnetworkData)) : []
        });

    }

    public gotoLibrary(){
        this.router.navigateByUrl('/library');
    }

    public gotoVnetwork(){
        this.router.navigateByUrl('/vnetwork');
    }

    constructor(
        private dialogService: DialogService,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private appContextService: AppContextService
    ) {
        this.loadVnetworkList()
    }

    // tslint:disable-next-line: member-ordering
    private session = null;

    // tslint:disable-next-line: no-empty
    public ngOnInit(): void {
        this.session = this.appContextService.powerShell.createSession(this.appContextService.activeConnection.nodeName);
    }

}
