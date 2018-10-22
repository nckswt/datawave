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
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-sorter.js';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-column-group.js';
import '../shared-styles.js';

class RecommenationsTable extends PolymerElement {
  static get template() {
    return html`
    <x-remote-sorting-example></x-remote-sorting-example>
    <dom-module id="x-remote-sorting-example">

        <vaadin-grid aria-label="Sorting with Data Provider Example" id="grid">

        <vaadin-grid-column-group resizable>

          <vaadin-grid-column>
            <template class="header">
              <vaadin-grid-sorter path="album" direction="desc">Album</vaadin-grid-sorter>
            </template>
            <template>[[item.album]]</template>
          </vaadin-grid-column>

          <vaadin-grid-column>
            <template class="header">
              <vaadin-grid-sorter path="artist">Artist</vaadin-grid-sorter>
            </template>
            <template>[[item.artist]]</template>
          </vaadin-grid-column>

          <vaadin-grid-column>
            <template class="header">
              <vaadin-grid-sorter path="recommender">Recommender</vaadin-grid-sorter>
            </template>
            <template>[[item.recommender]]</template>
          </vaadin-grid-column>

          <vaadin-grid-column>
            <template class="header">
              <vaadin-grid-sorter path="genre">Genre</vaadin-grid-sorter>
            </template>
            <template>[[item.genre]]</template>
          </vaadin-grid-column>

          <vaadin-grid-column>
            <template class="header">
              <vaadin-grid-sorter path="subgenres">Subgenres</vaadin-grid-sorter>
            </template>
            <template>[[item.subgenres]]</template>
          </vaadin-grid-column>

          <vaadin-grid-column>
            <template class="header">
              <vaadin-grid-sorter path="year">Year</vaadin-grid-sorter>
            </template>
            <template>[[item.year]]</template>
          </vaadin-grid-column>

          <vaadin-grid-column>
            <template class="header">
              <vaadin-grid-sorter path="nationality">Nationality</vaadin-grid-sorter>
            </template>
            <template>[[item.nationality]]</template>
          </vaadin-grid-column>

          <vaadin-grid-column>
            <template class="header">
              <vaadin-grid-sorter path="comments">Comments</vaadin-grid-sorter>
            </template>
            <template>[[item.comments]]</template>
          </vaadin-grid-column>

        </vaadin-grid>

        </vaadin-grid-column-group>

      </dom-module>
`};

  ready () {
    super.ready();
    var grid = this.$.grid;

    grid.size = 200;

    grid.dataProvider = function(params, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        var json = JSON.parse(xhr.responseText);

        params.sortOrders.forEach(function(sort) {
             const reverse = sort.direction === 'asc' ? -1 : 1;
             json.sort((a, b) => reverse * a[sort.path].localeCompare(b[sort.path]));
           });

        callback(json);
      };

      var url = "http://127.0.0.1:8080/recommendations";

      xhr.open('GET', url, true);
      xhr.send();
    };
  }
}

window.customElements.define('dw-recommendations-table', RecommenationsTable);
