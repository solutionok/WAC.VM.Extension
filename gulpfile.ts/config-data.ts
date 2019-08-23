
import { Config } from './common/config';

function gulpConfig(): Config {
    return {
        resjson: {
            resourceName: 'WACDevTeamVirtualMachineTemplateManager',
            localeOffset: 0,
            localePath: 'loc'
        },
        powershell: {
            name: 'wac-dev-team.virtualmachinetemplatemanager',
            guid: '153af076-ca08-473e-b3b8-c965eaf634b2',
            list: [
                'src',
                'node_modules/@microsoft/windows-admin-center-sdk'
            ],
            enablePester: false,
            skipCim: true
        },
        test: {
            skip: true
        }
    };
}

exports.gulpConfig = gulpConfig;
