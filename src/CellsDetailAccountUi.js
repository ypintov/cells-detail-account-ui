import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './CellsDetailAccountUi-styles.js';
import '@bbva-web-components/bbva-web-tab-default/bbva-web-tab-default.js';
import '@bbva-web-components/bbva-web-card-product/bbva-web-card-product.js';
/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component ...

Example:

```html
<cells-detail-account-ui></cells-detail-account-ui>
```

##styling-doc

@customElement cells-detail-account-ui
*/
export class CellsDetailAccountUi extends LitElement {
  static get is() {
    return 'cells-detail-account-ui';
  }

  // Declare properties
  static get properties() {
    return {
      account: { type: Object },
      movements: { type: Object },
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.account = undefined;
    this.movements = [];
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('cells-detail-account-ui-shared-styles'),
    ];
  }

  _formatAmount(currency, amount) {
    switch (currency) {
      case 'PEN':
        return `S/ ${Number(amount).toFixed(2)}`;
      case 'USD':
        return `$ ${Number(amount).toFixed(2)}`;
      case 'EUR':
        return `€ ${Number(amount).toFixed(2)}`;
      default:
        return '';
    }
  }

  // Define a template
  render() {
    return html`
      <div class="container">
        <div class="account">
          <bbva-web-tab-default label="Detalle de cuenta">
            <bbva-web-tab-default-item heading="Cuenta">
              ${this.account === undefined
                ? html`<div class="account__empty">
                    No existe información de la cuenta.
                  </div>`
                : html`<div class="accounts__item">
                    <bbva-web-card-product subheading=${account.productName}>
                      <bbva-web-list-item-bullet slot="option">
                        Numero de cuenta: ${account.number}
                      </bbva-web-list-item-bullet>

                      <bbva-web-list-item-bullet slot="option">
                        Saldo contable:
                        ${this._formatAmount(
                          account.currency,
                          account.amountPosted
                        )}
                      </bbva-web-list-item-bullet>
                      <bbva-web-list-item-bullet slot="option">
                        Saldo disponible:
                        ${this._formatAmount(
                          account.currency,
                          account.amountAvailable
                        )}
                      </bbva-web-list-item-bullet>
                      <bbva-web-list-item-bullet slot="option">
                        Participante: ${this.account.participant}
                      </bbva-web-list-item-bullet>
                      <bbva-web-list-item-bullet slot="option">
                        Estado: ${this.account.state}
                      </bbva-web-list-item-bullet>
                    </bbva-web-card-product>
                  </div>`}
            </bbva-web-tab-default-item>
            <bbva-web-tab-default-item heading="Movimientos"
              >Movimientos</bbva-web-tab-default-item
            >
          </bbva-web-tab-default>
        </div>
      </div>
    `;
  }
}
