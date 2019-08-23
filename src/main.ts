// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import './polyfills.ts';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CoreEnvironment } from '@microsoft/windows-admin-center-sdk/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { PowerShellScripts } from './generated/powershell-scripts';

if (environment.production) {
    enableProdMode();
}

// initialize SME module environment with localization settings.
CoreEnvironment.initialize(
    {
        name: 'wac-dev-team.virtualmachinetemplatemanager',
        powerShellModuleName: PowerShellScripts.module,
        isProduction: environment.production,
        shellOrigin: '*'
    },
    {
        resourcesPath: 'assets/strings'
    })
    .then(() => platformBrowserDynamic().bootstrapModule(AppModule));
