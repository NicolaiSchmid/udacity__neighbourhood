/**
 * @license
 * Copyright 2017 Nicolai Schmid All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { stringify } from 'query-string';
import { keys } from '../config';

const URL = `https://api.foursquare.com/v2/venues/`;


const paramsObject = {
    client_id: keys.foursquare.client_id,
    client_secret: keys.foursquare.client_secret,
    v: '20180110',
};

// This method just fetches information about the marker from the foursquare venue API
export const get = (markerId) => {
    const paramsString = stringify(paramsObject);

    return fetch(`${URL}${markerId}?${paramsString}`)
        .then(response => response.json())
        .then(data => data.response.venue)
}
