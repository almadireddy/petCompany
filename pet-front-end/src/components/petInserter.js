import React from 'react';

class PetInserter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ownerID: 0,
            name: '',
            breed: '',
            species: '',
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
        event.preventDefault();
        //construct query to insert
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
                        <input type='number' name='ownerID' value={this.state.ownerID} 
                        onChange={this.handleInputChange}/>
                    </label>
                    <br />
                    <label>
                        Name
                        <input type='text' name='name' value={this.state.name}
                        onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Breed
                        <input type='text' name='breed' value={this.state.breed}
                        onChange={this.handleInputChange} />
                    </label>
                    <br /><label>
                        Species
                        <input type='text' name='species' value={this.state.species}
                        onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <input type='submit' value='Create Pet' />
                </form>
            </div>
        );
    }
}

export default PetInserter;