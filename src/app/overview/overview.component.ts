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
    selector: 'overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css']
})
export class DefaultComponent implements OnInit {
    public searchString = ''
    public searchString1 = ''
    public active = false;
    public groupActive = false;
    public selection = null;
    public searchf = null;
    
    public selectedTemplateId = null
    public templateData = []
    public wizardItems = [
      {id: 'deploy', text: 'Deploy', icon: 'sme-icon-openInNewWindow'},
      {id: 'edit',   text: 'Edit',   icon: 'sme-icon-edit'},
      {id: 'create', text: 'Create', icon: 'sme-icon-add'},
      {id: 'clone',  text: 'Clone',  icon: 'sme-icon-copy'},
      {id: 'remove', text: 'Remove', icon: 'sme-icon-delete'}
    ]

    constructor(
        private dialogService: DialogService,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private appContextService: AppContextService
    ) {
        this.loadTemplateList()
        this.searchf = new FormControl('llllll')
    }
    
    public alert(arg: string) {
        alert(arg);
    }

    public onSearch3(s: string) {
        this.searchString1 = s;
    }
    public onDropdownChange(field: string) {
        this.alert(field);
    }

    public convertForCustomColumn(name: number): string {
        return 'Converted Value: ' + name * 1.3;
    }
    
    public doAction(id: any) {
        if (id === 'create') {
          this.router.navigateByUrl('/create')
        } else if (id === 'edit') {
            if (this.selectedTemplateId) {
                this.router.navigateByUrl('/edit/' + this.selectedTemplateId.id)
            }
        } else if (id === 'remove') {
            if (this.selectedTemplateId) {
                this.dialogService.show<ConfirmationDialogOptions, ConfirmationDialogResult>('confirmation-dialog', {
                    cancelButtonText: 'Cancel',
                    confirmButtonText: 'Yes, Remove it!',
                    message: 'This action cannot be undone!',
                    title: 'Are you sure?'
                }).subscribe(() => {
                    this.removeTemplate(this.selectedTemplateId.id)
                    setTimeout(() => {
                        this.appContextService.notification.alert('A template removed correctly!', 0, 'Success');
                        this.loadTemplateList()
                    },         500)
                });
            }
        } else if (id === 'clone') {
            if (this.selectedTemplateId) {

                this.cloneTemplate(this.selectedTemplateId.id)

                setTimeout(() => {
                    this.appContextService.notification.alert('A template created correctly!', 0, 'Success');
                    this.loadTemplateList()
                },         500)
            }
        } else if ( id === 'deploy' ) {

            if (this.selectedTemplateId) {
                this.router.navigateByUrl('/deploy/' + this.selectedTemplateId.id)
            }
        }
    }

    public cloneTemplate(id: any) {
        this.appContextService.settingsManager
            .getExtensionApplicationSettings(ExtensionSettings)
            .pipe( take(1) )
            .subscribe( settings => {

                let tmpdata = JSON.parse(JSON.stringify(settings.vmtemplatesData[id]))
                tmpdata.template.navItems[0].formItems[0].value = 'Copy of ' + tmpdata.template.navItems[0].formItems[0].value
                settings.vmtemplatesData[String(Date.now())] = tmpdata
                return settings.save();
            });
    }

    public removeTemplate(id: any) {
        this.appContextService.settingsManager
        // get the settings into the type for the versionedObject extension we defined
        .getExtensionApplicationSettings(ExtensionSettings)
        .pipe( take(1) )
        .subscribe( settings => {
            let datas = {}
            let saveddata = JSON.parse(JSON.stringify(settings.vmtemplatesData))
            for (let i in saveddata) {
                // tslint:disable-next-line: triple-equals
                if (i == id || !saveddata[i]['template']) {
                    continue
                }

                datas[i] = JSON.parse(JSON.stringify(saveddata[i]))
            }
            settings.vmtemplatesData = datas
            return settings.save();
            // // alternatively, we can save and revert if there is a failure.
            // return settings.trySave(() => {
            //     settings.booleanExample = true;
            // });

        })
    }

    public loadTemplateList() {
        this.templateData = []
        this.appContextService.settingsManager
        .getExtensionApplicationSettings(ExtensionSettings)
        .pipe( take(1) )
        .subscribe( settings => {

            let dta = settings.vmtemplatesData ? JSON.parse(JSON.stringify(settings.vmtemplatesData)) : {}
            let templateData = []
            if (dta) {

                for (let key in dta) {
                    if (!dta[key]['template']) {continue};

                    let osval = dta[key].osTemplate.navItems[0].formItems[1].value
                    // let lavel = ''
                    // for (let ii in dta[key].osTemplate.navItems[0].formItems[1].options ) {
                    //     // tslint:disable-next-line: triple-equals
                    //     if (osval == dta[key].osTemplate.navItems[0].formItems[1].options[ii].id) {
                    //         lavel = dta[key].osTemplate.navItems[0].formItems[1].options[ii].value
                    //     }
                    // }

                    templateData.push({
                        id : key,
                        name : dta[key].template.navItems[0].formItems[0].value,
                        os : osval,
                        description : dta[key].template.navItems[0].formItems[1].value
                    })
                }

                this.templateData = templateData;
            }
        });
    }
    
    public gotoLibrary(){
        this.router.navigateByUrl('/library');
    }
    public gotoVnetwork(){
        this.router.navigateByUrl('/vnetwork');
    }

    

    // tslint:disable-next-line: no-empty
    public ngOnInit(): void {}

}
