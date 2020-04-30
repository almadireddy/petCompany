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
        //this.call = this.call.bind(this);
    }

    // async call(tablename) {
    //     return (
            
    //     )
    // }

    async componentDidMount() {
        let x = await instance.get('/query', {
            params: {
                value: `select * from ${this.state.tablename}`
            }
        })
        this.setState({table: x.data});
        console.log(this.state);
    }

    render() {
        return (
            <div>
                {this.state.table && (
                    <QueryTable table={this.state.table}/>
                )}
            </div>
        )
    }
}

export default StateTable;