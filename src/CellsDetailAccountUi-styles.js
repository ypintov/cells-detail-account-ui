/* eslint-disable no-unused-vars */
import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`:host {
  display: block;
  box-sizing: border-box;
}

:host([hidden]),
[hidden] {
  display: none !important;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

table {
  margin: 1rem 0;
  width: 100%;
}

.account {
  display: flex;
  flex-direction: column;
  margin: 2rem;
  padding: 0 1rem;
}
.account__empty {
  color: #666666;
  font-style: italic;
  margin: 1.5rem 0;
}

bbva-web-card-product {
  max-width: 100%;
  padding: 0.2rem 1.2rem;
}

.text-color-negative {
  color: #c20f0f;
}
`;