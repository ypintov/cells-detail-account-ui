import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './CellsDetailAccountUi-styles.js';
import '@bbva-web-components/bbva-web-tab-default/bbva-web-tab-default.js';
import '@bbva-web-components/bbva-web-card-product/bbva-web-card-product.js';
import '@bbva-web-components/bbva-web-table-header/bbva-web-table-header.js';
import '@bbva-web-components/bbva-web-table-body/bbva-web-table-body.js';
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
      movements: { type: Array },
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

  _formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
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
                    <bbva-web-card-product
                      subheading=${this.account.productName}
                    >
                      <bbva-web-list-item-bullet slot="option">
                        Numero de cuenta: ${this.account.number}
                      </bbva-web-list-item-bullet>

                      <bbva-web-list-item-bullet slot="option">
                        Numero CCI: ${this.account.numberCCI}
                      </bbva-web-list-item-bullet>

                      <bbva-web-list-item-bullet slot="option">
                        Saldo contable:
                        ${this._formatAmount(
                          this.account.currency,
                          this.account.amountPosted
                        )}
                      </bbva-web-list-item-bullet>
                      <bbva-web-list-item-bullet slot="option">
                        Saldo disponible:
                        ${this._formatAmount(
                          this.account.currency,
                          this.account.amountAvailable
                        )}
                      </bbva-web-list-item-bullet>
                      <bbva-web-list-item-bullet slot="option">
                        Tipo: ${this.account.type}
                      </bbva-web-list-item-bullet>
                      <bbva-web-list-item-bullet slot="option">
                        Estado: ${this.account.state}
                      </bbva-web-list-item-bullet>
                    </bbva-web-card-product>
                  </div>`}
            </bbva-web-tab-default-item>
            <bbva-web-tab-default-item heading="Movimientos">
              ${this.movements.length === 0
                ? html`<div class="account__empty">No hay movimientos.</div>`
                : html` <table>
                    <thead>
                      <tr>
                        <th>
                          <bbva-web-table-header-text>
                            Fecha operación
                          </bbva-web-table-header-text>
                        </th>
                        <th>
                          <bbva-web-table-header-text>
                            Concepto
                          </bbva-web-table-header-text>
                        </th>
                        <th>
                          <bbva-web-table-header-text>
                            Monto
                          </bbva-web-table-header-text>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      ${this.movements.map(
                        (d) =>
                          html` <tr>
                            <td>
                              <bbva-web-table-body-text>
                                ${this._formatDate(d.operationDate)}
                              </bbva-web-table-body-text>
                            </td>
                            <td>
                              <bbva-web-table-body-text>
                                ${d.concept}
                              </bbva-web-table-body-text>
                            </td>
                            <td>
                              <bbva-web-table-body-text
                                class="${d.amount < 0
                                  ? 'text-color-negative'
                                  : ''}"
                              >
                                ${this._formatAmount(d.currency, d.amount)}
                              </bbva-web-table-body-text>
                            </td>
                          </tr>`
                      )}
                    </tbody>
                  </table>`}
            </bbva-web-tab-default-item>
          </bbva-web-tab-default>
        </div>
      </div>
    `;
  }
}
