import React from 'react';
import inserter from './inserter';

class ClientInserter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            minit: '',
            lname: '',
            phone: 0,
            email: '',
            address: '',
            birthday: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        alert('Submitted');
        console.log(this.state)
        inserter.post('/', ['client', this.state])
        event.preventDefault();
        //construct query to insert
    }

    render() {
        return (
            <div>
                <h1>
                    New Product
                </h1>
                <form onSubmit={this.handleSubmit}>
                <label>
                        Brand
                        <input type='text' name='fname' value={this.state.fname}
                        onChange={this.handleInputChange} />
                    </label>
                    <br /><label>
                        Brand
                        <input type='text' name='minit' value={this.state.minit}
                        onChange={this.handleInputChange} />
                    </label>
                    <br /><label>
                        Brand
                        <input type='text' name='lname' value={this.state.lname}
                        onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Quantity
                        <input type='number' name='phone' value={this.state.phone} 
                        onChange={this.handleInputChange}/>
                    </label>
                    <br />
                    <label>
                        Brand
                        <input type='text' name='email' value={this.state.email}
                        onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Name
                        <input type='text' name='address' value={this.state.address}
                        onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Price
                        <input type='text' name='birthday' value={this.state.birthday} 
                        onChange={this.handleInputChange}/>
                    </label>
                    <br />
                    <input type='submit' value='Create Client' />
                </form>
            </div>
        );
    }
}

export default ClientInserter;