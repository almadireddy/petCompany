import React from 'react';
import inserter from './inserter';

class ProductInserter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0,
            brand: '',
            name: '',
            price: 0,
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
        inserter.post('/', ['store_products', this.state])
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
                        Quantity
                        <input type='number' name='quantity' value={this.state.quantity} 
                        onChange={this.handleInputChange}/>
                    </label>
                    <br />
                    <label>
                        Brand
                        <input type='text' name='brand' value={this.state.brand}
                        onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Name
                        <input type='text' name='name' value={this.state.name}
                        onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Price
                        <input type='number' step='.01' name='price' value={this.state.price} 
                        onChange={this.handleInputChange}/>
                    </label>
                    <br />
                    <input type='submit' value='Create Product' />
                </form>
            </div>
        );
    }
}

export default ProductInserter;