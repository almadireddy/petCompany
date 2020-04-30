import React from 'react';
import instance from './utils';
import QueryTable from './queryTable';

class StateTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tablename: props.table,
            table: null
        };
    }

    async componentDidMount() {
        let x = await instance.get('/query', {
            params: {
                value: `select * from ${this.state.tablename}`
            }
        })
        this.setState({table: x.data});
        //console.log(this.state);
    }

    render() {
        return (
            <div>
                <h1>
                    State of {this.state.tablename}
                </h1>
                {this.state.table && (
                    <QueryTable pageSize={5} table={this.state.table}/>
                )}
            </div>
        )
    }
}

export default StateTable;