import React from 'react';

class petInserter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ownerID: 0,
            name: '',
            breed: '',
            species: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        alert('Submitted');
        console.log(this.state)
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>
                    New Pet
                </h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Owner ID
                        <input type='number' value={this.state.ownerID} 
                        onChange={this.handleChange}/>
                    </label>
                    <br />
                    <label>
                        Name
                        <input type='text' value={this.state.name}
                        onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Breed
                        <input type='text' value={this.state.breed}
                        onChange={this.handleChange} />
                    </label>
                    <br /><label>
                        Breed
                        <input type='text' value={this.state.species}
                        onChange={this.handleChange} />
                    </label>
                    <br />
                </form>
            </div>
        );
    }
}