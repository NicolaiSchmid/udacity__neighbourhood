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
