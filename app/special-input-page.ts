import { EventData, Page } from '@nativescript/core';
import { SpecialInputViewModel } from './special-input-view-model';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    const mainViewModel = page.navigationContext?.mainViewModel;
    const specialType = page.navigationContext?.specialType;
    page.bindingContext = new SpecialInputViewModel(mainViewModel, specialType);
}