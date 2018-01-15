import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

import { keys } from '../config';

export class MapComponent extends Component {
    state = {
        showingInfoWindow: false,
        selectedMarker: {},
        activeMarker: null,
    }


    render() {
        const { google } = this.props;
        return (
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
                        if (marker.selected) {
                            icon = new google.maps.MarkerImage(
                                `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|009CFF`,
                                new google.maps.Size(50, 34),
                                new google.maps.Point(0, 0),
                                new google.maps.Point(10, 34)
                            );
                        } else {
                            icon = new google.maps.MarkerImage(
                                `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|e90000`,
                                new google.maps.Size(50, 34),
                                new google.maps.Point(0, 0),
                                new google.maps.Point(10, 34)
                            );
                        }
                    }

                    return (
                        (!marker.hidden) && (
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