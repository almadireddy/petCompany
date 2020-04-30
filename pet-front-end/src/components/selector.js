import React from 'react';
import instance from './utils';
import QueryTable from './queryTable';

class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        console.log(this.state)
        instance.get('/query', {
            params: {
                value: this.state['value']
            }
        }).then(function(res) {
            console.log(res.data);
        });
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>
                    Queries
                </h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Select Query:
                        <select value={this.state.value} onChange={this.handleChange}>
                            <option value='0'>Show count of largest population</option>
                            <option value='1'>Show a listing of a key entity in the database</option>
                        </select>
                    </label>
                    <input type='submit' value='Execute' />
                </form>
                <QueryTable />
            </div>
        )
    }
}

export default Selector;