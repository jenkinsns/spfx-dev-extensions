import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import {
  CellFormatter,
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';

import * as strings from 'colorbystatusStrings';
import styles from './Colorbystatus.module.scss';

/**
 * If your field customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IColorbystatusProperties {
  // This is an example; replace with your own property
  sampleText?: string;
}

const LOG_SOURCE: string = 'ColorbystatusFieldCustomizer';

export default class ColorbystatusFieldCustomizer
  extends BaseFieldCustomizer<IColorbystatusProperties> {

  @override
  public onInit(): Promise<void> {
    // Add your custom initialization to this method.  The framework will wait
    // for the returned promise to resolve before firing any BaseFieldCustomizer events.
    Log.info(LOG_SOURCE, 'Activated ColorbystatusFieldCustomizer with properties:');
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
    Log.info(LOG_SOURCE, `The following string should be equal: "Colorbystatus" and "${strings.Title}"`);
    return Promise.resolve<void>();
  }

  @override
  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    // Use this method to perform your custom cell rendering.  The CellFormatter is a utility
    // that you can use to convert the cellValue to a text string.
    const text: string = CellFormatter.renderAsText(this.context.column, event.cellValue);
    let color:string;
    if(text == 'Approved')
    {
       color = "#00FF00";
    }
    else if(text == 'Rejected')
    {
      color = "#FF0000";
    }
    else if(text == 'Submitted')
    {
      color = "#FFFF00";
    }
    event.cellDiv.classList.add(styles.cell);
    event.cellDiv.innerHTML = `<div style='background-color:${color};'>${text}</div>`;
    
  }

  @override
  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    // This method should be used to free any resources that were allocated during rendering.
    // For example, if your onRenderCell() called ReactDOM.render(), then you should
    // call ReactDOM.unmountComponentAtNode() here.
    super.onDisposeCell(event);
  }
}
