import { Observable, ObservableArray, Frame } from '@nativescript/core';
import { shareService } from './services/share.service';

interface Capsule {
    type: 'text' | 'special';
    subtype?: string;
    imagePath?: string;
    title?: string;
    content?: string;
    unlockTime: string;
}

export class HelloWorldModel extends Observable {
    private _capsules: ObservableArray<Capsule>;
    private _isModalVisible = false;
    private _isSpecialModalVisible = false;

    constructor() {
        super();
        this._capsules = new ObservableArray<Capsule>();
    }

    get capsules(): ObservableArray<Capsule> {
        return this._capsules;
    }

    get isModalVisible(): boolean {
        return this._isModalVisible;
    }

    get isSpecialModalVisible(): boolean {
        return this._isSpecialModalVisible;
    }

    showOptions() {
        this._isModalVisible = true;
        this.notifyPropertyChange('isModalVisible', true);
    }

    hideModal() {
        this._isModalVisible = false;
        this.notifyPropertyChange('isModalVisible', false);
    }

    showSpecialOptions() {
        this.hideModal();
        this._isSpecialModalVisible = true;
        this.notifyPropertyChange('isSpecialModalVisible', true);
    }

    hideSpecialModal() {
        this._isSpecialModalVisible = false;
        this.notifyPropertyChange('isSpecialModalVisible', false);
        this.showOptions();
    }

    navigateToTextInput() {
        this.hideModal();
        Frame.topmost().navigate({
            moduleName: 'text-input-page',
            context: { mainViewModel: this }
        });
    }

    navigateToSpecialInput(args) {
        const specialType = args.object.parent.getChildAt(1).text;
        this.hideSpecialModal();
        Frame.topmost().navigate({
            moduleName: 'special-input-page',
            context: { 
                mainViewModel: this,
                specialType: specialType
            }
        });
    }

    addTextCapsule(title: string, content: string, unlockTime: string) {
        if (!content.trim()) return;
        
        this._capsules.unshift({
            type: 'text',
            title: title.trim(),
            content: content.trim(),
            unlockTime: unlockTime
        });
    }

    addSpecialCapsule(type: string, title: string, content: string, media: string, unlockTime: string) {
        if (!content.trim()) return;
        
        this._capsules.unshift({
            type: 'special',
            subtype: type,
            title: title.trim(),
            content: content.trim(),
            imagePath: media,
            unlockTime: unlockTime
        });
    }

    onShareTap(args) {
        const capsule = args.object.bindingContext;
        shareService.shareContent(capsule);
    }
}