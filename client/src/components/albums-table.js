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
import '@polymer/iron-image/iron-image.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-sorter.js';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-column-group.js';
import '../shared-styles.js';

class AlbumsTable extends PolymerElement {
  static get template() {
    return html`
    <style>
      vaadin-grid {
        height: 70vh;
      }

      .details {
        display: flex;
        font-size: 20px;
      }

      .details .img-column {
          flex: 30%;
          padding: 10px;
          margin-right: 10px;
      }

      .details .info-column {
          flex: 70%;
          padding: 10px;
      }

      .details p {
        display: flex;
        width:100%;
        font-size: 14px;
      }

      .details p span {
        font-weight: 600;
        padding-right: 10px;
      }

      iron-image {
        width:300px;
        height:200px;
        background-color: lightgray;
      }

    </style>

    <dom-module>

        <vaadin-grid aria-label="Sorting with Data Provider Example" id="grid"
          on-active-item-changed="_onActiveItemChanged">

          <template class="row-details">
            <div class="details">
              <div class="img-column">
                <iron-image sizing="contain" preload fade src="http://lorempixel.com/600/400"></iron-image>
              </div>
              <div class="info-column">
                <p><span>Top Songs </span>[[item.top_songs]]</p>
                <p><span>Subgenres </span>[[item.subgenres]]</p>
                <p><span>Nationality </span>[[item.nationality]]</p>
                <p><span>RIAA Certification </span>[[item.RIAA_certification]]</p>
                <p><span>Comments </span>[[item.comments]]</p>
              </div>
            </div>
          </template>

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
              <vaadin-grid-sorter path="year">Year</vaadin-grid-sorter>
            </template>
            <template>[[item.year]]</template>
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

  _onActiveItemChanged(e) {
    this.$.grid.detailsOpenedItems = [e.detail.value];
  }

}

window.customElements.define('dw-albums-table', AlbumsTable);
