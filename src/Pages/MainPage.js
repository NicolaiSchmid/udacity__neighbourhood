import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

import FilterComponent from '../Components/FilterComponent';
import InformationComponent from '../Components/InformationComponent';
import ListComponent from '../Components/ListComponent';
import MapComponent from '../Components/MapComponent';

import './MainPage.css';

export default class MainPage extends Component {
    constructor(props) {
        super(props);

        this.updateSelection = this.updateSelection.bind(this);
    }

    state = {
        markers: [
            {
                name: 'GOOT - Finest Cuts',
                position: {
                    lat: 53.54850891864796,
                    lng: 10.000675320625305,
                },
                id: '4e679b9b8877dfcf303d74cd',
                hidden: false,
            }, {
                name: 'Nord Coast Coffee Roastery',
                position: {
                    lat: 53.54657553211275,
                    lng: 9.98801917321201,
                },
                id: '561269e4498e5d594aced9de',
                hidden: false,
            }, {
                name: 'Public Coffee Roasters',
                position: {
                    lat: 53.55130726504126,
                    lng: 9.982659551079733,
                },
                id: '52e12f23498eab3870ffa96c',
                hidden: false,
            }, {
                name: 'estancia steaks',
                position: {
                    lat: 53.54858135517771,
                    lng: 9.995538848631494,
                },
                id: '4b5ffcdef964a5209ad229e3',
                hidden: false,
            },
        ]
    }

    // This method updates the state of the page to reflect the current selected venue
    updateSelection(id) {
        // Copy the state to a new array
        let markers = [].concat(this.state.markers);

        // Map over the markers to set the selection state
        markers = markers.map((marker) => {
            // The updateSelection function is called with an id of the selected item
            // If the current marker is the selected the selected property gets updated
            // otherwhise it's set to false
            if (marker.id === id) {
                marker.selected = true;
            } else {
                marker.selected = false;
            }

            return marker;
        });

        this.setState({
            markers,
        });
    }

    // If a search query is entered, this method get's called by the filterComponent
    // with the query string as an argument
    filterMarkers = (query) => {
        // This creates a new Regex, which is escaped for malicious user input, 
        // to test it against the marker names for filtering
        const match = new RegExp(escapeRegExp(query), 'i');

        // This maps over the markers to check if the marker 
        // is still within the search query
        let markers = this.state.markers.map((marker) => {
            // If it is not (Regex Test) then the hidden property is set, 
            // so the list and map elements aren't rendering it
            if (!match.test(marker.name)) {
                marker.hidden = true;
            } else {
                marker.hidden = false;
            }
            return marker;
        });

        // Lastly all the matches are sorted by alphabet
        markers.sort(sortBy('name'));

        this.setState({
            markers,
        });
    }

    render() {
        return (
            <main>
                <FilterComponent onQuery={this.filterMarkers} />
                <ListComponent markers={this.state.markers} updateSelection={this.updateSelection} />
                <InformationComponent markers={this.state.markers} role="contentinfo" />
                <div className="mapComponent">
                    <MapComponent markers={this.state.markers} updateSelection={this.updateSelection} />
                </div>
            </main>
        )
    }
};
