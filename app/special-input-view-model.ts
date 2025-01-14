import { Observable, Frame } from '@nativescript/core';
import { ImagePicker } from "@nativescript/imagepicker";
import { HelloWorldModel } from './main-view-model';

export class SpecialInputViewModel extends Observable {
    private _title = '';
    private _message = '';
    private _mediaPath = '';
    private _specialType = '';
    private _showDatePicker = false;
    private _unlockDate: Date;
    private _unlockTime: Date;
    private _mainViewModel: HelloWorldModel;

    constructor(mainViewModel: HelloWorldModel, specialType: string) {
        super();
        this._mainViewModel = mainViewModel;
        this._specialType = specialType;
        this._unlockDate = new Date();
        this._unlockTime = new Date();
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        if (this._title !== value) {
            this._title = value;
            this.notifyPropertyChange('title', value);
            this.notifyPropertyChange('canContinue', this.canContinue);
        }
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        if (this._message !== value) {
            this._message = value;
            this.notifyPropertyChange('message', value);
            this.notifyPropertyChange('canContinue', this.canContinue);
        }
    }

    get mediaPath(): string {
        return this._mediaPath;
    }

    get specialType(): string {
        return this._specialType;
    }

    get showDatePicker(): boolean {
        return this._showDatePicker;
    }

    get unlockDate(): Date {
        return this._unlockDate;
    }

    set unlockDate(value: Date) {
        this._unlockDate = value;
        this.notifyPropertyChange('unlockDate', value);
    }

    get unlockTime(): Date {
        return this._unlockTime;
    }

    set unlockTime(value: Date) {
        this._unlockTime = value;
        this.notifyPropertyChange('unlockTime', value);
    }

    get pageTitle(): string {
        return `New ${this._specialType}`;
    }

    get titleHint(): string {
        return 'Give this memory a title';
    }

    get messageLabel(): string {
        return 'Your Memory';
    }

    get messageHint(): string {
        return 'Describe this memory...';
    }

    get canContinue(): boolean {
        return this._message.trim().length > 0 && this._mediaPath.length > 0;
    }

    showDateTimePicker() {
        this._showDatePicker = true;
        this.notifyPropertyChange('showDatePicker', true);
    }

    hideDateTimePicker() {
        this._showDatePicker = false;
        this.notifyPropertyChange('showDatePicker', false);
    }

    async addMedia() {
        try {
            const imagePicker = new ImagePicker({ mode: "single", mediaType: 1 });
            const selection = await imagePicker.present();
            
            if (selection.length > 0) {
                const selected = selection[0];
                this._mediaPath = selected.android || selected.ios;
                this.notifyPropertyChange('mediaPath', this._mediaPath);
                this.notifyPropertyChange('canContinue', this.canContinue);
            }
        } catch (error) {
            console.error('Media selection error:', error);
        }
    }

    removeMedia() {
        this._mediaPath = '';
        this.notifyPropertyChange('mediaPath', this._mediaPath);
        this.notifyPropertyChange('canContinue', this.canContinue);
    }

    saveSpecialCapsule() {
        if (!this.canContinue) return;
        
        // Combine date and time
        const unlockDateTime = new Date(
            this._unlockDate.getFullYear(),
            this._unlockDate.getMonth(),
            this._unlockDate.getDate(),
            this._unlockTime.getHours(),
            this._unlockTime.getMinutes()
        );
        
        if (this._mainViewModel) {
            this._mainViewModel.addSpecialCapsule(
                this._specialType,
                this._title,
                this._message,
                this._mediaPath,
                unlockDateTime.toISOString()
            );
            Frame.topmost().goBack();
        }
    }
}