import React from 'react';
import instance from './utils';
import QueryTable from './queryTable';

class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            table: null,
            query: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.changeQuery = this.changeQuery.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    changeQuery(event) {
        this.setState({query: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        let x;
        if (this.state.query !== '') {
            x = await instance.get('/query', {
                params: {
                    value: this.state['query']
                }
            });
        } else {
            x = await instance.get('/sample-query', {
                params: {
                    value: this.state['value']
                }
            });
        }

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
                            <option value='3'>Show the cost of an occurrence, derived 
                            using aggregate functions (Cost to groom a pet)</option>
                            <option value='4'>Show a schedule for multiple occurrences, 
                            sorted by date and time (today’s appointments)</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Execute my own Query: 
                        <textarea value={this.state.query} onChange={this.changeQuery} />
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