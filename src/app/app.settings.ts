import { VersionedObject } from '@microsoft/windows-admin-center-sdk/core';

export class ExtensionSettings extends VersionedObject {

    private static propertyNames = {
      libraryd: 'libraryd',
      vmtemplatedt: 'vmtemplatedt',
      vnetworkd: 'vnetworkd',
    };


    public get applicationTemplate(): any {
        return ExtensionSettings.applicationTemplateData
    }

    public get hardwareTemplate(): any {
        return ExtensionSettings.hardwareTemplateData
    }

    public get osTemplate(): any {
        return ExtensionSettings.osTemplateData
    }

    public get template(): any {
        return ExtensionSettings.templateData
    }

    private static hardwareTemplateData = {
        title: 'Hardware Template',
        navItems: [
          {
            id: 'processors',
            title: 'Processors',
            active: true,
            formItems: [
              {
                id: 'number_of_processors',
                label: 'Number of Processors',
                type: 'number',
                value: 2
              },
              {
                id: 'compatibility',
                label: 'Compatibility',
                type: 'checkbox',
                checked: false
              }
            ]
          },
          {
            id: 'memory',
            title: 'Memory',
            active: false,
            activeRadioName: 'static_memory',
            formItems: [
              {
                id: 'static_memory',
                name: 'memory_definition',
                followme: 'static_memory',
                type: 'radio',
                label: 'Static Memory',
                checked: true
              },
              {
                id: 'startup_memory',
                type: 'number',
                label: 'Startup Memory',
                value: 4,
                follow: 'dynamic_memory'
              },
              {
                id: 'dynamic_memory',
                name: 'memory_definition',
                followme: 'dynamic_memory',
                type: 'radio',
                label: 'Dynamic Memory',
                checked: false
              },
              {
                id: 'vm_memory',
                type: 'number',
                label: 'Virtual Machine Memory',
                value: 4,
                follow: 'static_memory'
              },
              {
                id: 'min_memory',
                type: 'number',
                label: 'Minimum Memory',
                value: 1,
                follow: 'dynamic_memory'
              },
              {
                id: 'max_memory',
                type: 'number',
                label: 'Maximum Memory',
                value: 8,
                follow: 'dynamic_memory'
              },
              {
                id: 'memory_percent',
                type: 'number',
                label: 'Memory Percentage Buffer',
                value: 20,
                follow: 'dynamic_memory'
              }
            ]
          },
          {
            id: 'scsi_adapters',
            title: 'SCSI Adapters',
            active: false,
            formItems: [],
            addScsiAdapter: true,
            navItems: []
          },
          {
            id: 'network_adapters',
            title: 'Network Adapters',
            active: false,
            addNetworkAdapter: true,
            navItems: []
          },
          {
            id: 'fibre_channel_adapters',
            title: 'Fibre channel adapters',
            active: false,
            addFibreAdapter: true,
            navItems: []
          },
          {
            id: 'advanced',
            title: 'Advanced',
            active: false,
            navItems: [
              {
                id: 'checkpoints',
                title: 'Checkpoints',
                active: false,
                activeRadioName: 'production',
                formItems: [
                  {
                    label: 'Checkpoint type',
                    type: 'label'
                  },
                  {
                    id: 'disabled',
                    name: 'checkpoint_type',
                    label: 'Disabled',
                    checked: false,
                    type: 'radio',
                    followme: 'disabled'
                  },
                  {
                    id: 'standard',
                    label: 'Standard',
                    name: 'checkpoint_type',
                    checked: false,
                    type: 'radio',
                    followme: 'standard'
                  },
                  {
                    id: 'production',
                    label: 'Production',
                    name: 'checkpoint_type',
                    type: 'radio',
                    checked: true,
                    followme: 'production'
                  },
                  {
                    id: 'checkpoint_fail',
                    label: 'Create standard checkpoint if production checkpoints fail',
                    type: 'checkbox',
                    checked : true,
                    follow: 'production'
                  }
                ]
              },
              {
                id: 'availability',
                title: 'Availability',
                active: false,
                activeRadioName: '--',
                formItems: [
                  {
                    label: 'High Availability',
                    type: 'label'
                  },
                  {
                    id: 'high_available',
                    name: 'high_available',
                    label: 'Make this machine high available',
                    type: 'checkbox',
                    checked: false,
                    followme: 'high_available'
                  },
                  {
                    label: 'Virtual Machine priority',
                    type: 'label',
                    follow: 'high_available'
                  },
                  {
                    id: 'high',
                    label: 'High',
                    name: 'machin_priority',
                    type: 'radio',
                    checked: false,
                    follow: 'high_available'
                  },
                  {
                    id: 'medium',
                    label: 'Medium',
                    name: 'machin_priority',
                    type: 'radio',
                    checked: true,
                    follow: 'high_available'
                  },
                  {
                    id: 'low',
                    label: 'Low',
                    name: 'machin_priority',
                    type: 'radio',
                    checked: false,
                    follow: 'high_available'
                  },
                  {
                    id: 'dont_auto_restart',
                    label: 'Do not restart automatically',
                    name: 'machin_priority',
                    type: 'radio',
                    checked: false,
                    follow: 'high_available'
                  }
                ]
              },
              {
                title: 'Secure boot',
                active: false,
                id: 'secure_boot',
                formItems: [
                  {
                    id: 'secureboot',
                    label: 'Enable secure boot',
                    type: 'checkbox',
                    checked: false
                  }
                ]
              },
              {
                id: 'cpu_priority',
                title: 'CPU Priority',
                active: false,
                activeRadioName: 'medium',
                formItems: [
                  {
                    label: 'Specify the priority for the virtual machine',
                    type: 'label'
                  },
                  {
                    id: 'high',
                    label: 'High',
                    name: 'cpu_priority',
                    type: 'radio',
                    checked: false,
                    followme: 'high'
                  },
                  {
                    id: 'medium',
                    label: 'Medium',
                    name: 'cpu_priority',
                    type: 'radio',
                    checked: true,
                    followme: 'medium'
                  },
                  {
                    id: 'low',
                    label: 'Low',
                    name: 'cpu_priority',
                    type: 'radio',
                    checked: false,
                    followme: 'low'
                  },
                  {
                    id: 'custom',
                    label: 'Custom',
                    name: 'cpu_priority',
                    type: 'radio',
                    followme: 'custom',
                    checked: false
                  },
                  {
                    id: 'custom_range',
                    max: 10000,
                    min: 0,
                    value: 4000,
                    step: 1,
                    type: 'range',
                    follow: 'custom'
                  }
                ]
              },
              {
                id: 'memory_weight',
                title: 'Memory Weight',
                active: false,
                activeRadioName: 'high',
                formItems: [
                  {
                    label: 'Specify the priority for the virtual machine',
                    type: 'label'
                  },
                  {
                    id: 'high',
                    label: 'High',
                    name: 'cpu_priority',
                    type: 'radio',
                    checked: true,
                    followme: 'high'
                  },
                  {
                    id: 'medium',
                    label: 'Medium',
                    name: 'cpu_priority',
                    type: 'radio',
                    checked: false,
                    followme: 'medium'
                  },
                  {
                    id: 'low',
                    label: 'Low',
                    name: 'cpu_priority',
                    type: 'radio',
                    checked: false,
                    followme: 'low'
                  },
                  {
                    id: 'custom',
                    label: 'Custom',
                    name: 'cpu_priority',
                    followme: 'custom',
                    type: 'radio',
                    checked: false
                  },
                  {
                    id: 'custom_range',
                    max: 100,
                    min: 1,
                    value: 1,
                    type: 'range',
                    follow: 'custom'
                  }
                ]
              },
              {
                id: 'virtual_numa',
                title: 'Virtual NUMA',
                active: false,
                activeRadioName: '',
                formItems: [
                  {
                    id: 'span_numa',
                    label: 'Allow virtual machines to span hardware NUMA nodes',
                    type: 'checkbox',
                    checked: true
                  },
                  {
                    id: 'config_numa',
                    followme: 'config_numa',
                    label: 'Configure virtual NUMA topology',
                    type: 'checkbox',
                    checked: false
                  },
                  {
                    id: 'max_processor',
                    label: 'Maximum processors per Virtual NUMA node',
                    value: 50,
                    follow: 'config_numa',
                    type: 'horizontal_number'
                  },
                  {
                    id: 'max_memory',
                    label: 'Maximum memory per Virtual NUMA node',
                    value: 50,
                    follow: 'config_numa',
                    type: 'horizontal_number'
                  },
                  {
                    id: 'max_socket',
                    label: 'Maximum virtual NUMA Nodes per socket',
                    value: 50,
                    follow: 'config_numa',
                    type: 'horizontal_number'
                  }
                ]
              }
            ]
          }
        ]
    }

    private static applicationTemplateData = {
        title: 'Application Template',
        navItems: [
          {
            id: 'Identity_information',
            title: 'Identity information',
            active: true,
            formItems: [
              {
                id: 'computer_name',
                label: 'Computer name:',
                value: '',
                type: 'horizontal_text'
              }
            ]
          }
        ]
    }

    private static osTemplateData = {
        title: 'Operating System Template',
        navItems: [
          {
            id: 'Identity_information',
            title: 'Identity information',
            active: true,
            formItems: [
              {
                id: 'computer_name',
                label: 'Computer name:',
                value: '*',
                type: 'horizontal_text'
              },
              {
                id: 'os',
                label: 'Operating System',
                type: 'horizontal_select',
                value: 'opt1',
                options: [
                    { id: 'Windows Server 2019 Standard', label: 'Windows Server 2019 Standard' },
                    { id: 'Windows Server 2019 Datacenter', label: 'Windows Server 2019 Datacenter' },
                    { id: 'Windows Server 2019 Standard Core', label: 'Windows Server 2019 Standard Core' },
                    { id: 'Windows Server 2019 Datacenter Core', label: 'Windows Server 2019 Datacenter Core' },
                    { id: 'Windows Server 2016 Standard', label: 'Windows Server 2019 Standard Core' },
                    { id: 'Windows Server 2016 Datacenter', label: 'Windows Server 2016 Datacenter' },
                    { id: 'Windows Server 2016 Datacenter Core', label: 'Windows Server 2012 R2 Standard' },
                    { id: 'Windows Server 2012 R2 Datacenter', label: 'Windows Server 2012 R2 Datacenter' },
                    { id: 'Windows Server 2012 R2 Standard Core', label: 'Windows Server 2012 R2 Standard Core' },
                    { id: 'Windows Server 2012 R2 Datacenter Core', label: 'Windows Server 2012 R2 Datacenter Core' },
                    { id: 'Windows Server 2012 Standard', label: 'Windows Server 2012 Standard' },
                    { id: 'Windows Server 2012 Datacenter', label: 'Windows Server 2012 Datacenter' },
                    { id: 'Windows Server 2012 Standard Core', label: 'Windows Server 2012 Standard Core' },
                    { id: 'Windows Server 2012 Datacenter Core', label: 'Windows Server 2012 Datacenter Core' },
                    { id: 'RHEL/CentOS 7.x', label: 'RHEL/CentOS 7.x' },
                    { id: 'RHEL/CentOS 6.x', label: 'RHEL/CentOS 6.x' },
                    { id: 'RHEL/CentOS 5.x', label: 'RHEL/CentOS 5.x' }
                ]
              }
            ]
          },
          {
            id: 'admin_password',
            title: 'Admin\npassword',
            active: false,
            activeRadioName: '',
            formItems: [
              {
                id: 'no_password',
                label: 'No local administrator credential',
                checked: true,
                type: 'radio',
                name: 'admin_password',
                followme: 'no_password'
              },
              {
                id: 'set_password',
                label: 'Specify local administrator credential',
                checked: false,
                type: 'radio',
                followme: 'set_password',
                name: 'admin_password'
              },
              {
                id: 'password',
                label: 'Password',
                type: 'horizontal_password',
                value: '',
                virtual_value: '',
                follow: 'set_password'
              },
              {
                id: 'confirm',
                label: 'Confirm',
                type: 'horizontal_password',
                virtual_value: '',
                value: '',
                follow: 'set_password'
              }
            ]
          },
          {
            id: 'domain_join',
            title: 'Domain Join',
            active: false,
            activeRadioName: 'workgroup',
            formItems: [
              {
                id: 'workgroup',
                label: 'Workgroup',
                followme: 'workgroup',
                checked: true,
                type: 'radio',
                name: 'domain_join'
              },
              {
                id: 'domain',
                label: 'Domain',
                followme: 'domain',
                checked: false,
                type: 'radio',
                name: 'domain_join'
              },
              {
                id: 'username',
                label: 'Username',
                type: 'horizontal_text',
                follow: 'domain',
                value: ''
              },
              {
                id: 'password',
                label: 'Password',
                type: 'horizontal_password',
                follow: 'domain',
                value: ''
              },
              {
                id: 'confirm',
                label: 'Confirm',
                type: 'horizontal_password',
                follow: 'domain',
                value: ''
              }
            ]
          },
          {
            id: 'Product_key',
            title: 'Product\nkey',
            active: false,
            formItems: [
              {
                id: 'product_key',
                label: 'Product\nkey',
                type: 'horizontal_text',
                value: ''
              }
            ]
          },
          {
            id: 'Time_Zone',
            title: 'Time\nZone',
            active: false,
            formItems: [
              {
                id: 'time_zone',
                label: '',
                type: 'select',
                value: 1,
                options: [
                    {id: '000', label: '(GMT-12:00) International Date Line West'},
                    {id: '001', label: '(GMT-11:00) Midway Island, Samoa'},
                    {id: '002', label: '(GMT-10:00) Hawaii'},
                    {id: '003', label: '(GMT-09:00) Alaska'},
                    {id: '004', label: '(GMT-08:00) Pacific Time (US and Canada); Tijuana'},
                    {id: '010', label: '(GMT-07:00) Mountain Time (US and Canada)'},
                    {id: '013', label: '(GMT-07:00) Chihuahua, La Paz, Mazatlan'},
                    {id: '015', label: '(GMT-07:00) Arizona'},
                    {id: '020', label: '(GMT-06:00) Central Time (US and Canada'},
                    {id: '025', label: '(GMT-06:00) Saskatchewan'},
                    {id: '030', label: '(GMT-06:00) Guadalajara, Mexico City, Monterrey'},
                    {id: '033', label: '(GMT-06:00) Central America'},
                    {id: '035', label: '(GMT-05:00) Eastern Time (US and Canada)'},
                    {id: '040', label: '(GMT-05:00) Indiana (East)'},
                    {id: '045', label: '(GMT-05:00) Bogota, Lima, Quito'},
                    {id: '050', label: '(GMT-04:00) Atlantic Time (Canada)'},
                    {id: '055', label: '(GMT-04:00) Caracas, La Paz'},
                    {id: '056', label: '(GMT-04:00) Santiago'},
                    {id: '060', label: '(GMT-03:30) Newfoundland and Labrador'},
                    {id: '065', label: '(GMT-03:00) Brasilia'},
                    {id: '070', label: '(GMT-03:00) Buenos Aires, Georgetown'},
                    {id: '073', label: '(GMT-03:00) Greenland'},
                    {id: '075', label: '(GMT-02:00) Mid-Atlantic'},
                    {id: '080', label: '(GMT-01:00) Azores'},
                    {id: '083', label: '(GMT-01:00) Cape Verde Islands'},
                    {id: '085', label: '(GMT) Greenwich Mean Time: Dublin, Edinburgh, Lisbon, London'},
                    {id: '090', label: '(GMT) Casablanca, Monrovia'},
                    {id: '095', label: '(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague'},
                    {id: '100', label: '(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb'},
                    {id: '105', label: '(GMT+01:00) Brussels, Copenhagen, Madrid, Paris'},
                    {id: '110', label: '(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna'},
                    {id: '113', label: '(GMT+01:00) West Central Africa'},
                    {id: '115', label: '(GMT+02:00) Bucharest'},
                    {id: '120', label: '(GMT+02:00) Cairo'},
                    {id: '125', label: '(GMT+02:00) Helsinki, Kiev, Riga, Sofia, Tallinn, Vilnius'},
                    {id: '130', label: '(GMT+02:00) Athens, Istanbul, Minsk'},
                    {id: '135', label: '(GMT+02:00) Jerusalem'},
                    {id: '140', label: '(GMT+02:00) Harare, Pretoria'},
                    {id: '145', label: '(GMT+03:00) Moscow, St. Petersburg, Volgograd'},
                    {id: '150', label: '(GMT+03:00) Kuwait, Riyadh'},
                    {id: '155', label: '(GMT+03:00) Nairobi'},
                    {id: '158', label: '(GMT+03:00) Baghdad'},
                    {id: '160', label: '(GMT+03:30) Tehran'},
                    {id: '165', label: '(GMT+04:00) Abu Dhabi, Muscat'},
                    {id: '170', label: '(GMT+04:00) Baku, Tbilisi, Yerevan'},
                    {id: '175', label: '(GMT+04:30) Kabul'},
                    {id: '180', label: '(GMT+05:00) Ekaterinburg'},
                    {id: '185', label: '(GMT+05:00) Islamabad, Karachi, Tashkent'},
                    {id: '190', label: '(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi'},
                    {id: '193', label: '(GMT+05:45) Kathmandu'},
                    {id: '195', label: '(GMT+06:00) Astana, Dhaka'},
                    {id: '200', label: '(GMT+06:00) Sri Jayawardenepura'},
                    {id: '201', label: '(GMT+06:00) Almaty, Novosibirsk'},
                    {id: '203', label: '(GMT+06:30) Yangon Rangoon'},
                    {id: '205', label: '(GMT+07:00) Bangkok, Hanoi, Jakarta'},
                    {id: '207', label: '(GMT+07:00) Krasnoyarsk'},
                    {id: '210', label: '(GMT+08:00) Beijing, Chongqing, Hong Kong SAR, Urumqi'},
                    {id: '215', label: '(GMT+08:00) Kuala Lumpur, Singapore'},
                    {id: '220', label: '(GMT+08:00) Taipei'},
                    {id: '225', label: '(GMT+08:00) Perth'},
                    {id: '227', label: '(GMT+08:00) Irkutsk, Ulaanbaatar'},
                    {id: '230', label: '(GMT+09:00) Seoul'},
                    {id: '235', label: '(GMT+09:00) Osaka, Sapporo, Tokyo'},
                    {id: '240', label: '(GMT+09:00) Yakutsk'},
                    {id: '245', label: '(GMT+09:30) Darwin'},
                    {id: '250', label: '(GMT+09:30) Adelaide'},
                    {id: '255', label: '(GMT+10:00) Canberra, Melbourne, Sydney'},
                    {id: '260', label: '(GMT+10:00) Brisbane'},
                    {id: '265', label: '(GMT+10:00) Hobart'},
                    {id: '270', label: '(GMT+10:00) Vladivostok'},
                    {id: '275', label: '(GMT+10:00) Guam, Port Moresby'},
                    {id: '280', label: '(GMT+11:00) Magadan, Solomon Islands, New Caledonia'},
                    {id: '285', label: '(GMT+12:00) Fiji Islands, Kamchatka, Marshall Islands'},
                    {id: '290', label: '(GMT+12:00) Auckland, Wellington'},
                    {id: '300', label: '(GMT+13:00) Nuku\'alofa'}]
              }
            ]
          },
          {
            id: 'Roles',
            title: 'Roles',
            active: false,
            formItems: []
          },
          {
            id: 'Features',
            title: 'Features',
            active: false,
            formItems: []
          },
          {
            id: 'Answer_file',
            title: 'Answer\nfile',
            active: false,
            formItems: [
              {
                id: 'answer_file',
                type: 'file',
                label: 'File path',
                value: ''
              }
            ]
          },
          {
            id: 'run_once',
            title: 'Run\nonce',
            active: false,
            formItems: [
              {
                id: 'itemlist',
                button_label: 'Add',
                type: 'list_control',
                default: '',
                lists: [{id:1, label:'item 1'}, {id:2, label:'item 2'}]
              }
            ]
          }
        ]
    }

    private static templateData = {
        title: 'Template',
        navItems: [{
            id: 'template_identity',
            title: 'Template identity',
            active: true,
            formItems: [{
                id: 'template_name',
                label: 'Template Name',
                type: 'text',
                value: ''
            }, {
                id: 'description',
                label: 'Description',
                type: 'textarea',
                value: ''
            }, {
                id: 'vm_generation',
                label: 'VM Generation',
                type: 'select',
                value: '1',
                options: [{ id: '1', label: 'Generation 1' }, { id: '2', label: 'Generation 2' }]
            }]
        }]
    }
    
    public get libraryData(): any {
      return <any> this.getProperty(ExtensionSettings.propertyNames.libraryd)
    }
    
    public set libraryData(values: any) {
      this.setProperty(ExtensionSettings.propertyNames.libraryd, values)
    }

    public get vnetworkData(): any {
      return <any> this.getProperty(ExtensionSettings.propertyNames.vnetworkd)
    }
    
    public set vnetworkData(values: any) {
      this.setProperty(ExtensionSettings.propertyNames.vnetworkd, values)
    }
    
    public get vmtemplatesData(): any {
        return <any> this.getProperty(ExtensionSettings.propertyNames.vmtemplatedt)
    }

    public set vmtemplatesData(values: any) {
        this.setProperty(ExtensionSettings.propertyNames.vmtemplatedt, values)
    }

    /**
     * Getter for the latest version of the extension settings.
     */
    public get latestVersion(): number {
        return 0;
    }

    /**
     * Attempts to upgrade the current version of the object at least one version towards the latest version.
     * If this.currentVersion is null or undefined, then the upgrade should initialize to the latest version.
     * This is called iteratively until the current version is equal to the latest version.
     */
    protected upgrade() {
        // For now, we don't need to do anything but initialize to the latest version.
        // NOTE: When latestVersion is updated, we need to add logic here to upgrade old settings objects.
        if (MsftSme.isNullOrUndefined(this.currentVersion)) {
            this.clear();
            this.currentVersion = this.latestVersion;
            return;
        }
    }
}
