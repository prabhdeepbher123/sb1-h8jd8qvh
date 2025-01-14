import { EventData, Page } from '@nativescript/core';
import { HelloWorldModel } from './main-view-model';

let mainViewModel: HelloWorldModel;

export function navigatingTo(args: EventData) {
    const page = <Page>args.object;
    if (!mainViewModel) {
        mainViewModel = new HelloWorldModel();
    }
    page.bindingContext = mainViewModel;
}