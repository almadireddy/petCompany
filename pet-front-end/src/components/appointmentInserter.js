import React from 'react';
import inserter from './inserter';

class AppointmentInserter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            duration: 0,
            start_time: '',
            groomerID: 0,
            ownerID: 0,
            pet: ''
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
        inserter.post('/', ['appointment', this.state])
        event.preventDefault();
        //construct query to insert
    }

    render() {
        return (
            <div>
                <h1>
                    New Appointment
                </h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Duration
                        <input type='number' name='duration' value={this.state.duration} 
                        onChange={this.handleInputChange}/>
                    </label>
                    <br />
                    <label>
                        Start Time
                        <input type='text' name='start_time' value={this.state.start_time}
                        onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Groomer ID
                        <input type='number' name='groomerID' value={this.state.groomerID} 
                        onChange={this.handleInputChange}/>
                    </label>
                    <br /><label>
                        Owner ID
                        <input type='number' name='ownerID' value={this.state.ownerID} 
                        onChange={this.handleInputChange}/>
                    </label>
                    <br />
                    <label>
                        Pet Name
                        <input type='text' name='pet' value={this.state.pet}
                        onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <input type='submit' value='Create Appointment' />
                </form>
            </div>
        );
    }
}

export default AppointmentInserter;