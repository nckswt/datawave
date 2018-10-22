/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// [START gae_flex_datastore_app]
'use strict';

const express = require('express');
const crypto = require('crypto');
const fs = require("fs");

const app = express();
app.enable('trust proxy');

// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GOOGLE_CLOUD_PROJECT environment variable. See
// https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
// These environment variables are set automatically on Google App Engine
const Datastore = require('@google-cloud/datastore');

// Instantiate a datastore client
const datastore = Datastore();

/**
 * Insert a recommendation into the database.
 *
 * @param {object} recommendation The recommendation record to insert.
 */
function insertRecommendation (recommendation) {
  return datastore.save({
    key: datastore.key('recommendation'),
    data: recommendation
  });
}

/**
 * Retrieve the latest 10 visit records from the database.
 */
function getRecommendations () {
  const query = datastore.createQuery('recommendation')
    .order('timestamp', { descending: true })
    .limit(10);

  return datastore.runQuery(query)
    .then((results) => {
      const entities = results[0];
      return entities.map((entity) => `Time: ${entity.timestamp}, Artist: ${entity.artist}`);
    });
}

app.get('/', (req, res, next) => {
  var sheet = JSON.parse(fs.readFileSync('music_sheet.json', 'utf8'));

  sheet.forEach(function (recommendation) {

    recommendation.timestamp = new Date();
    insertRecommendation(recommendation)
      // Query the last 10 recommendations from Datastore.
      .then(() => getRecommendations())
      .then((recommendations) => {
        res
          .status(200)
          .set('Content-Type', 'text/plain')
          .send(`Last recommendations:\n${recommendations.join('\n')}`)
          .end();
      })
      .catch(next);
  });
});

const PORT = process.env.PORT || 8080;
app.listen(process.env.PORT || 8080, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_flex_datastore_app]

module.exports = app;
