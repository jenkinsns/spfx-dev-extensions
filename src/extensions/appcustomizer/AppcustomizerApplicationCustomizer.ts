import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  Placeholder
} from '@microsoft/sp-application-base';

import * as strings from 'appcustomizerStrings';
import styles from './AppCustomizer.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';

const LOG_SOURCE: string = 'AppcustomizerApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IAppcustomizerApplicationCustomizerProperties {
  Header: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class AppcustomizerApplicationCustomizer
  extends BaseApplicationCustomizer<IAppcustomizerApplicationCustomizerProperties> {

  private _headerPlaceholder: Placeholder;
  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    return Promise.resolve<void>();
  }

  @override
  public onRender(): void {
    // Handling header place holder
    if (!this._headerPlaceholder) {
      this._headerPlaceholder = this.context.placeholders.tryAttach(
        'PageHeader',
        {
          onDispose: this._onDispose
        });

      // The extension should not assume that the expected placeholder is available.
      if (!this._headerPlaceholder) {
        console.error('The expected placeholder was not found.');
        return;
      }

      if (this.properties) {
        let headerString: string = this.properties.Header;
        if (!headerString) {
          headerString = '(Header property was not defined.)';
        }

        if (this._headerPlaceholder.domElement) {
          this._headerPlaceholder.domElement.innerHTML = `
          <div style="position:absolute;left:210px;top:0px;z-index: 2">
          <a href="#" onclick="print();"><img src="//icons.iconarchive.com/icons/avosoft/warm-toolbar/128/print-icon.png" width="32" height="32"></a>
          </div>`;
        }
      }
    }
      
  }
  private _onDispose(): void {
    console.log('Disposed custom header.');
  }
}
