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

import './ListComponent.css';

export default class ListComponent extends Component {

    render() {
        return (
            <div className="listComponent">
                <ul role="radiogroup">
                    {this.props.markers.map((marker) => {
                        let className = 'item';

                        if (marker.selected) className += ' selected'
                        return (
                            (!marker.hidden) && (
                                <li
                                    key={marker.id}
                                    className={className}

                                    tabIndex="0"
                                    role="radio"
                                    aria-checked={marker.selected}

                                    onClick={() => this.props.updateSelection(marker.id)}
                                    onKeyDown={(event) => {
                                        if (event.keyCode === 32 || event.keyCode === 13) {
                                            return this.props.updateSelection(marker.id)
                                        }
                                    }}
                                >{marker.name}</li>
                            )
                        )
                    })}
                </ul>
            </div>
        )
    }
};
