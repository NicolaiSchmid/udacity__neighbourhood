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
                        <div className="error" >{error}</div>
                    )}
                    {(marker) && (
                        <div>
                            <h3>{marker.name}</h3>[<a href={marker.url} target="_blank" tabIndex="0">Website</a>]
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
