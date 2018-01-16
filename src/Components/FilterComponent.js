import React, { Component } from 'react';

import './FilterComponent.css';

export default class FilterComponent extends Component {
    state = {
        query: '',
    }

    updateQuery(query) {
        this.setState({ query: query })
    }

    render() {
        return (
            <div className="filterComponent">
                <input
                    type="text"
                    placehoder="Filter"
                    value={this.state.query}
                    role="search"
                    onChange={(event) => {
                        this.updateQuery(event.target.value);
                        this.props.onQuery(event.target.value)
                        return;
                    }}
                />
            </div>
        )
    }
};
