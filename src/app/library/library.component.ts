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

@Component({
    selector: 'library',
    templateUrl: './library.component.html'
})
export class LibraryComponent implements OnInit {
    public searchString = ''
    public searchString1 = ''
    public active = false;
    public groupActive = false;
    public selection = null;
    public searchf = null;
    
    public selectedLibrary = null
    public libraryData = []
    public actionButtons = [
      {id: 'add', text: 'Add', icon: 'sme-icon-add'},
      {id: 'remove', text: 'Remove', icon: 'sme-icon-delete'}
    ]

    public runShell(tmpdata) {
        // const script = PowerShell.createScript(PowerShellScripts.scriptoutputtest.script, {stringFormat: JSON.stringify(tmpdata)});
        // return this.appContextService.powerShell.run(this.session, script);
    }

    public doAction(id: any) {
        if (id === 'add') {
          this.router.navigateByUrl('/library/add')
        } else if (id === 'remove') {
            if (this.selectedLibrary) {
                this.dialogService.show<ConfirmationDialogOptions, ConfirmationDialogResult>('confirmation-dialog', {
                    cancelButtonText: 'Cancel',
                    confirmButtonText: 'Yes, Remove it!',
                    message: 'This action cannot be undone!',
                    title: 'Are you sure?'
                }).subscribe(() => {
                    this.removeLibrary(this.selectedLibrary.id)
                    setTimeout(() => {
                        this.appContextService.notification.alert('A Library removed correctly!', 0, 'Success');
                        this.loadLibraryList()
                    },         500)
                });
            }
        }else if(id === 'back'){
            this.router.navigateByUrl('/');
        }
    }

    public removeLibrary(selectedItemId: any) {
        this.appContextService.settingsManager
        // get the settings into the type for the versionedObject extension we defined
        .getExtensionApplicationSettings(ExtensionSettings)
        .pipe( take(1) )
        .subscribe( settings => {
            let datas = []
            let saveddata = this.libraryData
            
            for (let i in saveddata) {
                // tslint:disable-next-line: triple-equals
                if (saveddata[i]['id'] === selectedItemId || !saveddata[i]['id']) {
                    continue
                }

                datas.push(JSON.parse(JSON.stringify(saveddata[i])))
            }
            settings.libraryData = datas;
            this.libraryData = datas;

            return settings.save();

        })
    }

    public loadLibraryList() {
        this.libraryData = []
        this.appContextService.settingsManager
        .getExtensionApplicationSettings(ExtensionSettings)
        .pipe( take(1) )
        .subscribe( settings => {
            this.libraryData = settings.libraryData.length ? JSON.parse(JSON.stringify(settings.libraryData)) : []
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
        this.loadLibraryList()
        this.searchf = new FormControl('llllll')
    }

    // tslint:disable-next-line: member-ordering
    private session = null;

    // public getVMInfo() {
    //     const script = PowerShell.createScript( PowerShellScripts.getinfo.script );
    //     return this.appContextService.powerShell.run(this.session, script);
    // }

    // tslint:disable-next-line: no-empty
    public ngOnInit(): void {
        this.session = this.appContextService.powerShell.createSession(this.appContextService.activeConnection.nodeName);
    }

}
