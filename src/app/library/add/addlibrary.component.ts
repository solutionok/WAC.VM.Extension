import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TreeNodeDataItem, TreeTableComponent, AppContextService } from '@microsoft/windows-admin-center-sdk/angular';
import { ExtensionSettings } from './../../app.settings';
import { take } from 'rxjs/operators';
// tslint:disable-next-line: ordered-imports
import { PowerShell } from '@microsoft/windows-admin-center-sdk/core';
import { PowerShellScripts } from './../../../generated/powershell-scripts';

@Component({
    selector: 'addlibrary-component',
    templateUrl: './addlibrary.component.html'
})

export class AddlibraryComponent implements OnInit, OnDestroy {
    @ViewChild('simpleTreeTable')
    private simpleTreeTable: TreeTableComponent;

    public treePath = 'src/resources/icons/actions/filter.svg';
    public libraryInfo = null;
    private internal: TreeNodeDataItem;

    public get selectedData1(): TreeNodeDataItem {
        return this.internal;
    }
    public set selectedData1(value: TreeNodeDataItem) {
        this.internal = value;
    }

    public refreshSampleData(): void {
        this.libraryInfo = null;
    }

    public getSampleDataItemIdentity(data: any): string {
        return data.id;
    }

    public loadLibrary(): void {
        this.runShell(this.treePath).subscribe(res => {
            this.libraryInfo = null;
            if (res.completed === 'True') {
                let data = [JSON.parse(res.results[0])];
                // let nodeData = <TreeNodeDataItem>[];
                // nodeData.data = data.data;
                // nodeData.children = data.children;
                
                this.libraryInfo = data
            }
        });
    }

    public goBack() {
        // this.locationService.back();
        this.router.navigateByUrl('/library')
    }

    public addLibrary() {
        this.appContextService.settingsManager
        // get the settings into the type for the versionedObject extension we defined
        .getExtensionApplicationSettings(ExtensionSettings)
        .pipe(take(1))
        .subscribe(settings => {
            let data = [];
            if (settings.libraryData && settings.libraryData.length) {
                data = JSON.parse(JSON.stringify(settings.libraryData));
            }

            data.push({
                id: 'library.' + Date.now(),
                name: this.treePath.split('/').pop(),
                type: 'Unknown',
                path: this.treePath,
                description: 'Unknown'
            });
            settings.libraryData = JSON.parse(JSON.stringify(data));
            return settings.save();
        })
        setTimeout(() => {
            let messge = 'Saved successfully!' ;
            this.appContextService.notification.alert(messge, 0, 'Success');
            this.goBack();
        },         500)
    }

    public runShell(path) {
        const script = PowerShell.createScript(PowerShellScripts.Get_Libraryinfo.script, {stringFormat: path});
        return this.appContextService.powerShell.run(this.PowerShellSession, script);
    }

    constructor(
        private appContextService: AppContextService,
        private router: Router,
        private locationService: Location
    ) {
        
        this.libraryInfo = [{
            data: {
              id: 1,
              label: 'InitialTree',
              type: 'file'
            }
        }];
    }

    // tslint:disable-next-line: member-ordering
    private PowerShellSession = null;

    // tslint:disable-next-line: no-empty
    public ngOnInit(): void {
        this.PowerShellSession = this.appContextService.powerShell.createSession(this.appContextService.activeConnection.nodeName);
    }

    public ngOnDestroy(): void {
        this.PowerShellSession.dispose()
    }

}
