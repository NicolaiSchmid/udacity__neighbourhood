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
import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

import { keys } from '../config';

export class MapComponent extends Component {
    render() {
        const { google } = this.props;
        return (
            // Create a new MapComponent in the DOM with its center in Hamburg
            <Map
                google={this.props.google}
                initialCenter={{
                    lat: 53.550865,
                    lng: 9.994319,
                }}
                zoom={14}

                role="application"
                className="mapComponent">

                {this.props.markers.map((marker) => {

                    // Change markerColor to blue, if it's selected                    
                    let icon;
                    if (google) {
                        // This snippet fetches a custom marker image 
                        // from the google charts api to be applied as custom marker icon
                        if (marker.selected) {
                            //   -------------------->                          ----------------------->|  This is the hex value for the color
                            icon = new google.maps.MarkerImage(
                                `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|009CFF`,
                                new google.maps.Size(50, 34),
                                new google.maps.Point(0, 0),
                                new google.maps.Point(10, 34)
                            );
                        } else {
                            //   -------------------->                          ----------------------->|  This is the hex value for the color
                            icon = new google.maps.MarkerImage(
                                `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|e90000`,
                                new google.maps.Size(50, 34),
                                new google.maps.Point(0, 0),
                                new google.maps.Point(10, 34)
                            );
                        }
                    }

                    return (
                        // Only render the marker if its hidden property is not true 
                        // (look at `MainPage` for an explanation on filtering)
                        (!marker.hidden) && (
                            // Create a new MarkerComponent in the DOM
                            <Marker
                                name={marker.name}
                                position={marker.position}
                                icon={icon}
                                key={marker.id}
                                onClick={() => this.props.updateSelection(marker.id)} />
                        )
                    )
                })}
            </Map >
        )
    }
};


export default GoogleApiWrapper({
    apiKey: keys.google,
})(MapComponent)