import { Base64 } from 'js-base64';
// tslint:disable-next-line: ordered-imports
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
// tslint:disable-next-line: ordered-imports
import { Location } from '@angular/common';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AppContextService, DialogService, HttpService, LayoutComponent } from '@microsoft/windows-admin-center-sdk/angular';
// import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ExtensionSettings } from './../app.settings';
import { AdapterDeviceDialogOptions, AdapterDeviceDialogResult } from './device-modal/device-modal.component';

@Component({
    selector: 'default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.css']
})

export class DefaultComponent implements OnInit, OnDestroy {

    public activetabIndex = 0;
    // tslint:disable-next-line: variable-name
    public ScsiAdapterType = [
        { id: 1, label: 'Default' }
    ]
    // tslint:disable-next-line: variable-name
    public ScsiDeviceObject = { hdd: 0, dvd: 0 }
    public wizardItems = []
    public activedNav = false
    public addAdapterNav = null
    public vnetworks = null
    public addDeviceNav = null
    public pageMode = ''
    public templateKey = null
    public wizardItem = null
    public adapterDialogShow = false
    public deviceDialogShow = false
    public libraryData = []
    public vnetData = []

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'default';
    }

    public saveComponentData(): void {

        this.appContextService.settingsManager
            // get the settings into the type for the versionedObject extension we defined
            .getExtensionApplicationSettings(ExtensionSettings)
            .pipe(take(1))
            .subscribe(settings => {

                let SavedData = settings.vmtemplatesData ? JSON.parse(JSON.stringify(settings.vmtemplatesData)) : {}

                // password processing
                // empty virtual value
                // set real value to a encrypted virtual value
                if (this.wizardItems[2].navItems[1].formItems[2].virtual_value) {

                    let encrypt = Base64.encode(this.wizardItems[2].navItems[1].formItems[2].virtual_value);
                    this.wizardItems[2].navItems[1].formItems[2].virtual_value = '';
                    this.wizardItems[2].navItems[1].formItems[2].value = encrypt;

                    let encrypt1 = Base64.encode(this.wizardItems[2].navItems[1].formItems[3].virtual_value);
                    this.wizardItems[2].navItems[1].formItems[3].virtual_value = '';
                    this.wizardItems[2].navItems[1].formItems[3].value = encrypt1;
                }

                // tslint:disable-next-line: triple-equals
                SavedData[this.pageMode == 'edit' ? this.templateKey : String(Date.now())] = {
                    template: this.wizardItems[0],
                    hardwareTemplate: this.wizardItems[1],
                    osTemplate: this.wizardItems[2],
                    applicationTemplate: this.wizardItems[3]
                }
                settings.vmtemplatesData = JSON.parse(JSON.stringify(SavedData))

                return settings.save();
            })
        setTimeout(() => {

            let messge = this.pageMode === 'edit' ? 'Saved successfully!' : 'A template created successfully!'
            this.appContextService.notification.alert(messge, 0, 'Success');
            this.locationService.back();
        }, 500)
    }

    public goBack() {
        this.locationService.back();
    }

    public getFormData(navItem: any): any {
        let formData = {}

        if (navItem.activedRadioName) {
            formData['actived'] = navItem.activedRadioName
        }

        if (!navItem['formItems'] || !navItem['formItems'].length) { return null }

        for (let f = 0; f < navItem['formItems'].length; f++) {// first level forms
            let formItem = navItem['formItems'][f]

            // tslint:disable-next-line: max-line-length
            if (!formItem['id'] || ('undefined' === typeof (formItem['value']) && typeof formItem['checked'] === 'undefined')) {// if no value item then skip
                continue
            }

            // if not check in having name property of radio item
            if (formItem['type'] === 'radio' && formItem['name'] && !formItem['checked']) { continue }

            if (navItem['activeRadioName'] && formItem['follow'] && navItem['activeRadioName'] !== formItem['follow']) { continue }

            formData[formItem['id']] = 'undefined' !== typeof (formItem['value']) ? formItem['value'] : formItem['checked']
        }
        return formData
    }

    public dolog(i) {
        // console.log(i)
    }

    public activatingNav(wizard: any, activeNav: any): void {
        this.deactiveAllNav(wizard)
        activeNav['active'] = true
        this.activedNav = activeNav
    }

    public scsiModal(navItem: any): void {
        this.addAdapterNav = navItem
        let items = this.addAdapterNav.navItems

        if (items.length >= 4) {
            this.appContextService.notification.alert('SCSI adapter limitation is 4!', 0, 'Warning!');
            return;
        }

        this.ScsiDeviceObject = { hdd: 0, dvd: 0 }
        this.addDeviceNav = {
            title: 'SCSI Adapter ' + items.length,
            active: false,
            addScsiDevice: true,
            navItems: [],
            formItems: [{
                id: 'scsi_adapter_type',
                label: 'SCSI Adapter type',
                type: 'select',
                value: 1,
                options: this.ScsiAdapterType
            }, {
                id: 'scsi_adapter_device_attached',
                label: 'Devices attached',
                type: 'child_counter'
            }]
        }

        this.dialogService.show<AdapterDeviceDialogOptions, AdapterDeviceDialogResult>('adapter-device-dialog', {
            title: 's',
            label: 's'
        }).subscribe();
    }

    public addFibreAdapter(navItem: any): void {

        if (navItem.navItems.length >= 4) {
            this.appContextService.notification.alert('Fibre adapter limitation is 4!', 0, 'Warning!');
            return;
        }
        navItem.navItems.push({
            title: 'Adapter ' + navItem.navItems.length,
            formItems: [
                {
                    id: 'fibtestitem',
                    label: 'SCSI ID',
                    type: 'number',
                    readonly: true,
                    value: navItem.navItems.length,
                }
            ]
        })

    }

    public addNetworkAdapter(navItem: any): void {
        if (navItem.navItems.length >= 8) {
            this.appContextService.notification.alert('Network adapter limitation is 8!', 0, 'Warning!');
            return;
        }
        navItem.navItems.push({
            title: 'Adapter ' + navItem.navItems.length,
            activeRadioName: 'network_disconnected',
            active: false,
            formItems: [
                {
                    label: 'Connectivity:',
                    type: 'label'
                },
                {
                    id: 'network_disconnected',
                    name: 'network_connetation',
                    followme: 'network_disconnected',
                    label: 'Disconnected',
                    checked: true,
                    type: 'radio'
                },
                {
                    id: 'network_connected',
                    name: 'network_connetation',
                    followme: 'network_connected',
                    label: 'Connected',
                    type: 'radio',
                    checked: false
                },
                {
                    id: 'connected_vlan_id',
                    label: 'VLAN ID',
                    follow: 'network_connected',
                    type: 'vnet_select',
                    value: '',
                },
                {
                    id: 'connected_enabled_virtual_switch',
                    label: 'Enable virtual switch optimizations',
                    follow: 'network_connected',
                    type: 'checkbox',
                    checked: true
                },
                {
                    id: 'enable_mac',
                    label: 'Enable spoofing of MAC addresses',
                    follow: 'network_connected',
                    type: 'checkbox',
                    checked: true
                },
                {
                    id: 'enable_ip',
                    label: 'Enable guest specified IP addresses',
                    follow: 'network_connected',
                    type: 'checkbox',
                    checked: true
                }
            ]
        })

    }

    public getDeviceLastPoint(type) {
        let pos = 0;
        for (let i = 0; i < this.addDeviceNav.navItems.length; i++) {
            if (this.addDeviceNav.navItems[i].devtype === type) {
                pos = i + 1;
            }
        }
        return pos;
    }

    public addScsiDevice(devices) {
        this.addAdapterNav.navItems.push(this.addDeviceNav)
        let items = this.addDeviceNav.navItems
        let hcount = 0
        let dcount = 0
        let fcount = 0
        let pos = 0
        let iitem = null

        if ((items.length + devices.hdd + devices.dvd) >= 63) {
            this.appContextService.notification.alert('The device count is over the limitation 63!', 0, 'Warning!');
            return;
        }

        // tslint:disable-next-line: forin
        for (let i in items) {
            if (items[i].devtype === 'hdd') { hcount++ }
            if (items[i].devtype === 'dvd') { dcount++ }
        }

        if (devices.hdd > 0) {
            while (devices.hdd) {
                iitem = {
                    title: 'HardDisk ' + (hcount++),
                    activeRadioName: 'new_virtual_disk',
                    devtype: 'hdd',
                    formItems: [
                        {
                            id: 'harddisk_id',
                            name: 'harddisk_id',
                            label: 'SCSI ID',
                            type: 'number',
                            readonly: true,
                            value: hcount + dcount + fcount
                        },
                        {
                            id: 'virtual_disk',
                            name: 'virtual_disk_creation',
                            label: 'Existing virtual disk',
                            followme: 'exist_virtual_disk',
                            type: 'radio',
                            checked: false
                        },
                        {
                            id: 'exist_disk_path',
                            label: 'File path',
                            follow: 'exist_virtual_disk',
                            type: 'existing_disk_list',
                            value: ''
                        },
                        {
                            id: 'exist_disk_name',
                            label: 'Disk Name',
                            follow: 'exist_virtual_disk',
                            type: 'text',
                            value: ''
                        },
                        {
                            id: 'new_virtual_disk',
                            name: 'virtual_disk_creation',
                            label: 'New virtual disk',
                            followme: 'new_virtual_disk',
                            type: 'radio',
                            checked: true
                        },
                        {
                            id: 'new_virtual_disk_type',
                            label: 'Virtual Disk Type',
                            follow: 'new_virtual_disk',
                            type: 'select',
                            value: 'dynamic',
                            options: [
                                {
                                    id: 'dynamic',
                                    label: 'Dynamic'
                                },
                                {
                                    id: 'fixed',
                                    label: 'Fixed'
                                }
                            ]
                        },
                        {
                            id: 'new_virtual_disk_size',
                            label: 'Virtual Disk size',
                            follow: 'new_virtual_disk',
                            type: 'number',
                            value: '20'
                        },
                        {
                            id: 'new_virtual_disk_name',
                            label: 'File Name',
                            follow: 'new_virtual_disk',
                            type: 'text',
                            value: 'Disk name'
                        }
                    ]
                }

                pos = this.getDeviceLastPoint('hdd');
                if (!pos) {
                    items.push(iitem)
                } else {
                    items.splice(pos, 0, iitem)
                }
                devices.hdd--
            }
        }

        if (devices.dvd > 0) {
            while (devices.dvd) {
                iitem = {
                    title: 'DVD Drive ' + (dcount++),
                    activeRadioName: 'no_media',
                    devtype: 'dvd',
                    formItems: [
                        {
                            id: 'dvd_id',
                            name: 'dvd_id',
                            label: 'SCSI ID',
                            type: 'number',
                            readonly: true,
                            value: hcount + dcount + fcount
                        },
                        {
                            id: 'no_media',
                            name: 'media_creation',
                            followme: 'no_media',
                            label: 'No media',
                            type: 'radio',
                            checked: true
                        },
                        {
                            id: 'iso_image',
                            name: 'media_creation',
                            followme: 'iso_image',
                            label: 'ISO Image',
                            type: 'radio',
                            checked: false
                        },
                        {
                            id: 'iso_image_file_path',
                            label: 'File path',
                            follow: 'iso_image',
                            type: 'text',
                            value: ''
                        },
                        {
                            id: 'iso_image_share_file_copy',
                            label: 'Share file instead of coping',
                            follow: 'iso_image',
                            type: 'checkbox',
                            checked: true
                        }
                    ]
                }
                pos = this.getDeviceLastPoint('dvd')
                if (!pos) {
                    items.push(iitem)
                } else {
                    items.splice(pos, 0, iitem)
                }
                devices.dvd--
            }
        }

    }

    public addScsiAdapter(adapterType) {
        let items = this.addAdapterNav.navItems
        if (items.length >= 4) {
            this.appContextService.notification.alert('SCSI adapter limitation is 4!', 0, 'Warning!');
            return;
        }

        items.push({
            title: 'SCSI Adapter ' + items.length,
            active: false,
            addScsiDevice: true,
            navItems: [],
            formItems: [{
                id: 'scsi_adapter_type',
                label: 'SCSI Adapter type',
                type: 'select',
                value: adapterType,
                options: this.ScsiAdapterType
            }, {
                id: 'scsi_adapter_device_attached',
                label: 'Devices attached',
                type: 'child_counter'
            }]
        });
    }

    private deactiveAllNav(wizard: any): void {

        // tslint:disable-next-line: forin
        for (let i in wizard.navItems) {
            wizard.navItems[i].active = false

            if (wizard.navItems[i].navItems) {//

                // tslint:disable-next-line: forin
                for (let ii in wizard.navItems[i].navItems) {
                    wizard.navItems[i].navItems[ii].active = false

                    if (wizard.navItems[i].navItems[ii].navItems) {//

                        // tslint:disable-next-line: forin
                        for (let iii in wizard.navItems[i].navItems[ii].navItems) {
                            wizard.navItems[i].navItems[ii].navItems[iii].active = false

                        }
                    }
                }
            }
        }
    }

    private initialData() {

        this.wizardItems = []
        this.activedNav = false
        this.addAdapterNav = null
        this.addDeviceNav = null

        this.appContextService.settingsManager
            // get the settings into the type for the versionedObject extension we defined
            .getExtensionApplicationSettings(ExtensionSettings)
            .pipe(take(1))
            .subscribe(settings => {
                this.vnetData = settings.vnetworkData? JSON.parse(JSON.stringify(settings.vnetworkData)) : []
                if (this.pageMode === 'edit' || this.pageMode === 'deploy') {
                    let key = this.templateKey
                    let SavedData = JSON.parse(JSON.stringify(settings.vmtemplatesData))
                    
                    if (SavedData[key]) {
                        SavedData = SavedData[key]
                        this.wizardItems[0] = JSON.parse(JSON.stringify(SavedData.template))
                        this.wizardItems[1] = JSON.parse(JSON.stringify(SavedData.hardwareTemplate))
                        this.wizardItems[2] = JSON.parse(JSON.stringify(SavedData.osTemplate))
                        this.wizardItems[3] = JSON.parse(JSON.stringify(SavedData.applicationTemplate))
                        this.activedNav = this.wizardItems[0].navItems[0]
                        this.wizardItem = this.wizardItems[0]
                    } else {
                        this.dialogService.show('edit-result-dialog', {
                            buttonText: 'Close',
                            message: 'Data damaged',
                            title: 'Failed!'
                        }).subscribe(() => {

                            this.locationService.back();
                        });
                    }
                } else {
                    this.wizardItems[0] = JSON.parse(JSON.stringify(settings.template))
                    this.wizardItems[1] = JSON.parse(JSON.stringify(settings.hardwareTemplate))
                    this.wizardItems[2] = JSON.parse(JSON.stringify(settings.osTemplate))
                    this.wizardItems[3] = JSON.parse(JSON.stringify(settings.applicationTemplate))
                    this.activedNav = this.wizardItems[0].navItems[0]
                    this.wizardItem = this.wizardItems[0]
                }
            });


        this.libraryData = []
        this.appContextService.settingsManager
            .getExtensionApplicationSettings(ExtensionSettings)
            .pipe(take(1))
            .subscribe(settings => {
                this.libraryData = settings.libraryData.length ? JSON.parse(JSON.stringify(settings.libraryData)) : []
                // console.log(this.libraryData)
            });

    }

    constructor(
        private dialogService: DialogService,
        private appContextService: AppContextService,
        private http: HttpService,
        private router: Router,
        private locationService: Location
    ) {
        let segs = this.router.url.split('/')

        if (segs.length > 2 && segs[1] === 'edit') {
            this.pageMode = 'edit'
            this.templateKey = segs[2]
        } else if (segs.length > 2 && segs[1] === 'deploy') {
            this.pageMode = 'deploy'
            this.templateKey = segs[2]
        } else {
            this.pageMode = 'create'
            this.templateKey = null
        }
        this.initialData()
    }

    // tslint:disable-next-line: no-empty
    public ngOnInit(): void { }

    public ngOnDestroy(): void { }

}
