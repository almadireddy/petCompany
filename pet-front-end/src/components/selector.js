import React from 'react';
import instance from './utils';
import QueryTable from './queryTable';

class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            table: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        console.log(this.state)
        let x = await instance.get('/query', {
            params: {
                value: this.state['value']
            }
        })
        console.log(x.data);
        this.setState({table: x.data});
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
                            <option value='2'>Show a list of entities that must function together 
                            (Show a list of managers and receptionists who work together (JOIN))</option>
                        </select>
                    </label>
                    <input type='submit' value='Execute' />
                </form>
                <div>
                    {this.state.table && (
                        <QueryTable table={this.state.table} />
                    )}
                </div>
            </div>
        )
    }
}

export default Selector;