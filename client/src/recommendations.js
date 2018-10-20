/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import './shared-styles.js';


class Recommenations extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
        <h1>Recommended Albums</h1>
        <iron-ajax
              auto
              url="http://127.0.0.1:8080/recommendations"
              handle-as="json"
              on-response="recommendationsResponse"
              debounce-duration="300">
          </iron-ajax>
        <div id="results-table"></div>
      </div>
    `;
  }

  recommendationsResponse(e) {
    const resp = e.detail.response;
    console.log(resp);
    this.$['results-table'].innerHTML = `<pre>${JSON.stringify(resp, null, ' ')}</pre>`;
  }

}

window.customElements.define('dw-recommendations', Recommenations);
