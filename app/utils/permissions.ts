import { AndroidApplication, Application } from '@nativescript/core';

if (Application.android) {
    Application.android.on(AndroidApplication.activityRequestPermissionsEvent, 
        (args: any) => {
            console.log('Permission request response:', {
                requestCode: args.requestCode,
                permissions: args.permissions,
                grantResults: args.grantResults
            });
        }
    );
}