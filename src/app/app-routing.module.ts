import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdleComponent } from '@microsoft/windows-admin-center-sdk/angular';

// These are the basic routes that are required in order to load an extension and make service calls.
const appRoutes: Routes = [
    // The idle component route is used for 'long running' processes that take any amount of time (async).
    // This is a required path and component.
    {
        path: 'idle',
        component: IdleComponent
    },
    {
        path: '',
        loadChildren: './overview/overview.module#DefaultModule'
    },
    {
        path: 'create',
        loadChildren: './default/default.module#DefaultModule'
    },
    {
        path: 'edit/:id',
        loadChildren: './default/default.module#DefaultModule'
    },
    {
        path: 'deploy/:id',
        loadChildren: './deploy/default.module#DefaultModule'
    },
    {
        path: 'library',
        loadChildren: './library/library.module#DefaultModule'
    },
    {
        path: 'vnetwork',
        loadChildren: './vnetwork/vnetwork.module#DefaultModule'
    },
    // this child route is used to route back to the home path when an invalid URL is provided to the browser.
    {
        path: '**',
        redirectTo: ''  // double check navigation
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                // un-comment to enable debug log messages
                // enableTracing: true,

                // don't navigate at initially.
                initialNavigation: true,
                onSameUrlNavigation: 'reload'
            })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
