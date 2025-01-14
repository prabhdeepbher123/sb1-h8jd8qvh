import { EventData, Page } from '@nativescript/core';
import { TextInputViewModel } from './text-input-view-model';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    const mainViewModel = page.navigationContext?.mainViewModel;
    page.bindingContext = new TextInputViewModel(mainViewModel);
}