import React, { Component } from 'react';

import { get } from './FoursquareApi';

import './InformationComponent.css';

export default class InformationComponent extends Component {
    state = {
        marker: undefined,
    }

    componentWillReceiveProps = async (nextProps) => {
        let marker = nextProps.markers.filter((marker) => {
            return marker.selected && !marker.hidden;
        })[0];

        if (marker) {
            try {
                const result = await get(marker.id);

                this.setState({
                    marker: {
                        name: result.name,
                        categories: result.categories,
                        url: result.url,
                    },
                    error: undefined,
                });
            } catch (error) {
                console.error(error);
                this.setState({
                    marker: undefined,
                    error: 'Error fetching more information',
                });
            }
        } else {
            this.setState({
                marker: undefined,
            });
        }
    };


    render() {
        const { marker, error } = this.state;

        return (
            <div className="informationComponent" role="contentinfo">
                <div className="marker">
                    <h2>Information</h2>
                    {(error) && (
                        <div className="error">{error}</div>
                    )}
                    {(marker) && (
                        <div>
                            <h3>{marker.name}</h3>[<a href={marker.url} target="_blank">Website</a>]
                            {marker.categories.map((category) => {
                                return (
                                    <h4 key={category.name}>{category.name}</h4>
                                )
                            })}
                        </div>
                    )}
                </div>

                <p className="credits">This information is provided by Foursquare</p>
            </div>
        )
    }
};
