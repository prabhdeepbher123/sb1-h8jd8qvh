import { Observable, Frame } from '@nativescript/core';
import { HelloWorldModel } from './main-view-model';

export class TextInputViewModel extends Observable {
    private _textContent = '';
    private _title = '';
    private _showDatePicker = false;
    private _unlockDate: Date;
    private _unlockTime: Date;
    private _mainViewModel: HelloWorldModel;

    constructor(mainViewModel: HelloWorldModel) {
        super();
        this._mainViewModel = mainViewModel;
        this._unlockDate = new Date();
        this._unlockTime = new Date();
    }

    get textContent(): string {
        return this._textContent;
    }

    set textContent(value: string) {
        if (this._textContent !== value) {
            this._textContent = value;
            this.notifyPropertyChange('textContent', value);
            this.notifyPropertyChange('canContinue', this.canContinue);
        }
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        if (this._title !== value) {
            this._title = value;
            this.notifyPropertyChange('title', value);
        }
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

    get canContinue(): boolean {
        return this._textContent.trim().length > 0;
    }

    showDateTimePicker() {
        this._showDatePicker = true;
        this.notifyPropertyChange('showDatePicker', true);
    }

    hideDateTimePicker() {
        this._showDatePicker = false;
        this.notifyPropertyChange('showDatePicker', false);
    }

    saveTextCapsule() {
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
            this._mainViewModel.addTextCapsule(
                this._title,
                this._textContent,
                unlockDateTime.toISOString()
            );
            Frame.topmost().goBack();
        }
    }
}