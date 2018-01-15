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
                                    role="button"

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
