import { Observable } from '@nativescript/core';

export class ShareService extends Observable {
    shareContent(content: any) {
        console.log('Share content:', content);
        // Sharing functionality will be implemented later
    }
}

export const shareService = new ShareService();