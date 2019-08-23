// tslint:disable-next-line: ordered-imports
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
// tslint:disable-next-line: ordered-imports
import { Location } from '@angular/common';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import {
    AppContextService,
    // DataTableComponent,
    // DataTableCustomSortEvent,
    // DataTableLazyLoadEvent,
    DialogService,
    // nodeRequestOptions
} from '@microsoft/windows-admin-center-sdk/angular';
import { PowerShell,NotificationLinkType,WorkItemSubmitRequest } from '@microsoft/windows-admin-center-sdk/core';
import { PowerShellScripts } from '../../generated/powershell-scripts';

// tslint:disable-next-line: ordered-imports
import { take } from 'rxjs/operators';
import { ExtensionSettings } from '../app.settings';

@Component({
    selector: 'default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit, OnDestroy {
    // tslint:disable-next-line: variable-name
    public ScsiAdapterType = [
        { id: 1, label: 'Default' }
    ]
    public excutingPowerShell = false;
    public activetabIndex = 0;
    public wizardItem = null;
    // tslint:disable-next-line: variable-name
    public ScsiDeviceObject = { hdd: 0, dvd: 0, fib: 0 }
    public wizardItems = []
    public activedNav = false
    public addAdapterNav = null
    public addDeviceNav = null
    public pageMode = ''
    public templateKey = null
    public vswitchdata = []
 
    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'default';
    }

    public deployTemplate() {

        let tabids = ['machine', 'hardware', 'os', 'application']
        let templateData = {}
        let tabdata = {}
        let tabSrc = {}

        for (let i = 0; i < tabids.length; i++) {
            tabSrc = this.wizardItems[i]
            tabdata = {}

            /* navItem */
            for (let j = 0; j < tabSrc['navItems'].length; j++) {
                let navItem = tabSrc['navItems'][j]
                let formv = {}

                if (navItem['addScsiAdapter'] === true) {// scsi adapters
                    // tslint:disable-next-line: variable-name
                    let _adapters = navItem['navItems']

                    let scadapters = [];

                    if (_adapters.length) {

                        for (let scsi in _adapters) {// scsi adapter

                            if (_adapters[scsi]['navItems'].length) {

                                let scsiadapter = {
                                    adapter: scsi,
                                    devices: []
                                }

                                let hddi = 0
                                let dvdi = 0
                                let fibi = 0
                                // tslint:disable-next-line: variable-name
                                let _devices = _adapters[scsi]['navItems']

                                // tslint:disable-next-line: forin
                                for (let scsiDiv in _devices) {

                                    let scsiDevice = {}

                                    if (_devices[scsiDiv]['devtype'] === 'hdd') {// if HardDisk
                                        scsiDevice['device_type'] = 'hdd';
                                        scsiDevice['scsi_id'] = _devices[scsiDiv]['formItems'][0]['value']

                                        if (_devices[scsiDiv]['formItems'][1]['checked'] === true) {// if exist virtual disk checked
                                            scsiDevice['hdd_type'] = 'exist_virtual_disk'
                                            scsiDevice['file_path'] = _devices[scsiDiv]['formItems'][2]['value']
                                            scsiDevice['diskname'] = _devices[scsiDiv]['formItems'][3]['value']
                                        } else if (_devices[scsiDiv]['formItems'][4]['checked'] === true) {// if new virtual disk checked
                                            scsiDevice['hdd_type'] = 'new_virtual_disk'
                                            scsiDevice['disk_type'] = _devices[scsiDiv]['formItems'][5]['value']
                                            scsiDevice['disk_size'] = _devices[scsiDiv]['formItems'][6]['value']
                                            scsiDevice['disk_file'] = _devices[scsiDiv]['formItems'][7]['value']
                                        }
                                    } else if (_devices[scsiDiv]['devtype'] === 'dvd') {// if DVD Driver

                                        scsiDevice['device_type'] = 'dvd';
                                        scsiDevice['scsi_id'] = _devices[scsiDiv]['formItems'][0]['value']

                                        if (_devices[scsiDiv]['formItems'][1]['checked'] === true) {// if NO media checked
                                            scsiDevice['dvd_type'] = 'no_media';

                                        } else if (_devices[scsiDiv]['formItems'][3]['checked'] === true) {// if ISO image checked
                                            scsiDevice['dvd_type'] = 'iso_image';
                                            scsiDevice['disk_file'] = _devices[scsiDiv]['formItems'][3]['value']
                                            scsiDevice['share_file'] = _devices[scsiDiv]['formItems'][4]['value']
                                        }
                                        // tslint:disable-next-line: triple-equals
                                    } else if (_devices[scsiDiv]['devtype'] == 'fib') {// if Fibre chanel

                                        scsiDevice['device_type'] = 'fib';
                                        scsiDevice['fib'] = fibi++
                                    }
                                    scsiadapter['devices'].push(scsiDevice)
                                }

                                scadapters.push(scsiadapter)
                            }
                        }
                    }
                    tabdata['scsi_adapters'] = scadapters;
                } else if (navItem['addNetworkAdapter'] === true) {// network adapters
                    let ntadapters = []

                    for (let nti = 0; nti < navItem['navItems'].length; nti++) {
                        let adapter = { adapter_index: nti }
                        // tslint:disable-next-line: variable-name
                        let _adapter = navItem['navItems'][nti]
                        if (_adapter['formItems'][1].checked === true) {
                            adapter['connected'] = false
                        } else if (_adapter['formItems'][2].checked === true) {
                            console.log(_adapter['formItems'])
                            adapter['connected'] = true
                            adapter['vlanid'] = _adapter['formItems'][3]['value']
                            adapter['virtual_switch'] = _adapter['formItems'][4]['checked']
                            adapter['spoofing_mac'] = _adapter['formItems'][5]['checked']
                            adapter['guest_ip'] = _adapter['formItems'][6]['checked']
                        }
                        ntadapters.push(adapter)
                    }

                    tabdata['network_adapters'] = ntadapters
                } else if (navItem['addFibreAdapter'] === true) {// fibre adapters

                    let fibreadapters = []

                    for (let fibi = 0; fibi < navItem['navItems'].length; fibi++) {
                        let adapter = { adapter: fibi }
                        // tslint:disable-next-line: variable-name
                        let _adapter = navItem['navItems'][fibi]

                        fibreadapters.push(adapter)
                    }

                    tabdata['fibre_adapters'] = fibreadapters
                    // tslint:disable-next-line: triple-equals
                } else if (i === 1 && navItem.id === 'memory') {
                    formv = { memory_type : navItem.activeRadioName}
                    if (navItem.activeRadioName === 'static_memory') {
                        formv['startup_memory'] = navItem.formItems[1].value;
                    }else{
                        formv['virtual_machine_memory'] = navItem.formItems[3].value;
                        formv['minium_memory'] = navItem.formItems[4].value;
                        formv['maximum_memory'] = navItem.formItems[5].value;
                        formv['memory_percentage_buffer'] = navItem.formItems[6].value;
                    }
                    tabdata[navItem['id']] = formv
                } else if (i === 1 && navItem['id'] === 'advanced') {// is advance
                    let childnav = null;
                    for (let adi = 0; adi < navItem['navItems'].length; adi++) {
                        childnav = navItem['navItems'][adi];

                        if (childnav.id === 'checkpoints') {

                            formv = { checkpoint_type : childnav.activeRadioName}
                            if (childnav.activeRadioName === 'production') {
                                formv['create_if_failed'] = childnav.formItems[4].checked;
                            }
                            tabdata[childnav['id']] = formv
                        } else if (childnav.id === 'availability') {
                            formv = { high_availability : childnav.activeRadioName === 'high_available'}
        
                            if (childnav.activeRadioName === 'high_available') {
        
                                if (childnav.formItems[3].checked === true) { formv['priority'] = 'high'; }
                                else if (childnav.formItems[4].checked === true) { formv['priority'] = 'medium'; }
                                else if (childnav.formItems[5].checked === true) { formv['priority'] = 'low'; }
                                else if (childnav.formItems[6].checked === true) { formv['priority'] = 'dont_restart'; }
                            }
                            tabdata[childnav['id']] = formv
                        } else if (childnav.id === 'cpu_priority') {
                            formv = { priority_type : childnav.activeRadioName}
        
                            if (childnav.activeRadioName === 'custom') {
        
                                formv['custom_priority'] = childnav.formItems[5].value
                            }
                            
                            tabdata[childnav['id']] = formv
                        } else if (childnav.id === 'memory_weight') {
                            formv = { priority_type : childnav.activeRadioName}
        
                            if (childnav.activeRadioName === 'custom') {
        
                                formv['custom_priority'] = childnav.formItems[5].value
                            }
                            tabdata[childnav['id']] = formv
                        } else if (childnav.id === 'virtual_numa') {
                            formv = { 
                                allow_span_numa : childnav.formItems[0].checked,
                                custom_numa_topology : childnav.formItems[1].checked
                            }
        
                            if (childnav.formItems[1].checked === true) {
        
                                formv['max_processor'] = childnav.formItems[2].value;
                                formv['max_memory'] = childnav.formItems[3].value;
                                formv['max_numa_node'] = childnav.formItems[4].value;
                            }
                            tabdata[childnav['id']] = formv
                        } else {

                            formv = this.getFormData(childnav)
                            if (formv) {tabdata[childnav.id] = formv}
                        }


                    }

                } else if (i === 2 && navItem.id === 'admin_password') {
                    formv = { special_credential : navItem.activeRadioName === 'set_password'}

                    if (navItem.activeRadioName === 'set_password') {

                        formv['password'] = navItem.formItems[2].value; 
                    }
                    tabdata[navItem['id']] = formv
                } else if (i === 2 && navItem.id === 'domain_join') {
                    formv = { domain_type : navItem.activeRadioName}

                    if (navItem.activeRadioName === 'set_password') {

                        formv['username'] = navItem.formItems[2].value; 
                        formv['password'] = navItem.formItems[3].value; 
                    }
                    tabdata[navItem['id']] = formv
                } else if (i === 2 && navItem.id === 'run_once') {
                    formv = { runonce_list : navItem.formItems[0].lists}
                    tabdata[navItem['id']] = formv
                } else {
                    formv = this.getFormData(navItem)

                    if (formv) {tabdata[navItem['id']] = formv}
                }

            }

            templateData[tabids[i]] = tabdata
        }

        let tmpname = this.wizardItems[0].navItems[0].formItems[0].value
        const script = PowerShell.createScript(PowerShellScripts.Get_Deployresult.script, {stringFormat: JSON.stringify(templateData)});
        const workItem: WorkItemSubmitRequest = {
            typeId: 'deploy_shell_request',
            objectName: 'The deploy request',
            powerShellScript: script,
            
            //in progress notifications
            inProgressTitle: 'Executing deploy request',
            startedMessage: 'The deploy request has been started',
            progressMessage: 'Working on deploy request',
        
            //success notification
            successTitle: 'Successfully executed a deploy request!',
            successMessage: '{{objectName}} was successful',
            
            //error notification
            errorTitle: 'Failed to execute deploy request',
            errorMessage: 'Error: {{ message }}'
        
            // nodeRequestOptions: {
            //    logAudit: true,
            //    logTelemetry: true
            // }
        };
        this.excutingPowerShell = true;
        this.appContextService.workItem.submitAndWait(this.appContextService.activeConnection.nodeName, workItem).subscribe(res=>{
            this.excutingPowerShell = false;
        })
    }

    /** if exporting rule is just form values only */
    public saveComponentData(): void {

        let flag = this.appContextService.settingsManager
            // get the settings into the type for the versionedObject extension we defined
            .getExtensionApplicationSettings(ExtensionSettings)
            .pipe(take(1))
            .subscribe(settings => {

                let SavedData = JSON.parse(JSON.stringify(settings.vmtemplatesData))
                if (!SavedData) {
                    SavedData = {}
                }

                // tslint:disable-next-line: triple-equals
                SavedData[this.pageMode == 'edit' ? this.templateKey : String(Date.now())] = {
                    template: this.wizardItems[0],
                    hardwareTemplate: this.wizardItems[1],
                    osTemplate: this.wizardItems[2],
                    applicationTemplate: this.wizardItems[3]
                }
                settings.vmtemplatesData = SavedData
                return settings.save();
            })

        setTimeout(() => {
            let messge = this.pageMode === 'edit' ? 'Saved successfully!' : 'A template created successfully!'
            this.appContextService.notification.alert(messge, 0, 'Success');
            // this.locationService.back();
            
          this.router.navigateByUrl('/create')
        },         500)
    }

    public goBack() {
        this.locationService.back();
    }

    public getFormData(navItem: any): any {
        let formData = {}

        if (navItem.activedRadioName) {
            formData['actived'] = navItem.activedRadioName
        }

        if (!navItem['formItems'] || !navItem['formItems'].length) {return null}

        for (let f = 0; f < navItem['formItems'].length; f++) {// first level forms
            let formItem = navItem['formItems'][f]

            // tslint:disable-next-line: max-line-length
            if (!formItem['id'] || ('undefined' === typeof (formItem['value']) && typeof formItem['checked'] === 'undefined')) {// if no value item then skip
                continue
            }

            // if not check in having name property of radio item
            if (formItem['type'] === 'radio' && formItem['name'] && !formItem['checked']) {continue}

            if (navItem['activeRadioName'] && formItem['follow'] && navItem['activeRadioName'] !== formItem['follow']) {continue}

            formData[formItem['id']] = 'undefined' !== typeof (formItem['value']) ? formItem['value'] : formItem['checked']
        }
        return formData
    }

    public activatingNav(wizard: any, activeNav: any): void {
        this.deactiveAllNav(wizard)
        activeNav['active'] = true
        activeNav['editable'] = this.activetabIndex === 0;
        this.activedNav = activeNav
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

                let key = this.templateKey
                let SavedData = JSON.parse(JSON.stringify(settings.vmtemplatesData))

                if (SavedData[key]) {
                    SavedData = SavedData[key]
                    let vmtab = JSON.parse(JSON.stringify(SavedData.template));
                    let hardwaretab = JSON.parse(JSON.stringify(SavedData.hardwareTemplate));
                    let ostab = JSON.parse(JSON.stringify(SavedData.osTemplate));
                    let applicationtab = JSON.parse(JSON.stringify(SavedData.applicationTemplate));
                    vmtab.title = 'Virtual Machine';
                    vmtab.navItems[0].id = 'vm_configration';
                    vmtab.navItems[0].title = 'VM Configration';
                    vmtab.navItems[0].formItems[0].id = 'vm_name';
                    vmtab.navItems[0].formItems[0].label = 'Virtual Machine name';
                    vmtab.navItems[0].formItems.splice(1,1);
                    vmtab.navItems[0].formItems.push({
                        id: 'vm_location',
                        label: 'VM Location',
                        type: 'text',
                        value: ''
                    })

                    let adapterObj = null
                    let hddList = []
                    let fibList = []
                    let deviceObj = null

                    for (let iadapter = 0; iadapter < hardwaretab.navItems[2].navItems.length; iadapter ++) {

                        adapterObj = hardwaretab.navItems[2].navItems[iadapter]

                        for (let idevice = 0; idevice < adapterObj.navItems.length; idevice ++) {
                            deviceObj = adapterObj.navItems[idevice]
                            
                            if (deviceObj.devtype === 'hdd') {
                                hddList.push({
                                    adapter: 'SCSI Adapter ' + iadapter,
                                    name: deviceObj.title,
                                    new_exists: deviceObj.activeRadioName === 'new_virtual_disk' ? 'New' : 'Exist',
                                    // exist_disk_path
                                    path: deviceObj.activeRadioName === 'new_virtual_disk' ? '' : deviceObj.formItems[2].value,
                                    virtual_disk_name: deviceObj.activeRadioName === 'new_virtual_disk' ? deviceObj.formItems[7].value : '',
                                    virtual_disk_type: deviceObj.activeRadioName === 'new_virtual_disk' ? deviceObj.formItems[5].value : '',
                                    virtual_disk_size: deviceObj.activeRadioName === 'new_virtual_disk' ? deviceObj.formItems[6].value : '',
                                    scsi_id: deviceObj.formItems[0].value
                                })
                            }
                        }

                    }

                    for (let fibdevice = 0; fibdevice < hardwaretab.navItems[4].navItems.length; fibdevice++) {
                        deviceObj = hardwaretab.navItems[4].navItems[fibdevice]
                        fibList.push({
                            adapter: fibdevice,
                            name: deviceObj.title,
                            connectivity: 'n/a, shall get from powershell?',
                            // comes from powershell
                            fibre_channel_san: 'should get from powershell'
                        })
                    }

                    vmtab.navItems.push({
                        id: 'storage_configuration',
                        title: 'Storage Configuration',
                        active: false,
                        formItems: [{
                            id: 'harddisk_list',
                            label: '',
                            type: 'harddisk_list',
                            list: hddList
                        }]
                    })

                    this.pageMode = 'edit'

                    let netadapterList = []
                    let netadapter = null

                    for (let inetadapter = 0; inetadapter < hardwaretab.navItems[3].navItems.length; inetadapter ++) {

                        netadapter = hardwaretab.navItems[3].navItems[inetadapter]

                        netadapterList.push({
                            name: netadapter.title,
                            connectivity: netadapter.activeRadioName === 'network_disconnected' ? 'Disconnected' : 'Connected',
                            virtual_switch: 'I dont know for now',
                            vlan_id: netadapter.activeRadioName === 'network_disconnected' ? '' : netadapter.formItems[3].value
                        })
                    }

                    vmtab.navItems.push({
                        id: 'network_configration',
                        title: 'Network Configuration',
                        active: false,
                        formItems: [{
                            id: 'network_list',
                            label: '',
                            type: 'network_list',
                            list: netadapterList
                        }]
                    })

                    vmtab.navItems.push({
                        id: 'fibre_channel_configuration',
                        title: 'Fibre channel Configuration',
                        active: false,
                        formItems: [{
                            id: 'fibchannel_list',
                            label: '',
                            type: 'fibchannel_list',
                            list: fibList
                        }]
                    })

                    this.wizardItems[0] = vmtab
                    this.wizardItems[1] = hardwaretab
                    this.wizardItems[2] = ostab
                    this.wizardItems[3] = applicationtab
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
            });
    }

    constructor(
        private dialogService: DialogService,
        private appContextService: AppContextService,
        private router: Router,
        private locationService: Location
    ) {
        this.initialData()
        let segs = this.router.url.split('/')
        this.templateKey = segs[2]
    }

    public runVswitchShell() {
        const script = PowerShell.createScript(PowerShellScripts.Get_Vswitch.script,{a:'dd'});
        return this.appContextService.powerShell.run(this.session, script);
    }

    // tslint:disable-next-line: member-ordering
    private session = null;
    // tslint:disable-next-line: member-ordering
    private vswitchSession = null;

    // tslint:disable-next-line: no-empty
    public ngOnInit(): void {
        this.session = this.appContextService.powerShell.createSession(this.appContextService.activeConnection.nodeName);
        
        let vswitchshell = this.runVswitchShell().subscribe(re=>{
            if (re.results && re.results.length) {
                this.vswitchdata = JSON.parse(re.results[0]);
            }
        });
        // this.vswitchSession = this.appContextService.powerShell.createSession(this.appContextService.activeConnection.nodeName);
    }

    public ngOnDestroy(): void {
        this.session.dispose()
    }

}
