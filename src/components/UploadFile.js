import React from 'react';
import { uploadProductImage, uploadProduct } from '../repository';

export default class ProductList extends React.Component {

    state = {
        selectedFile: null,
        name: null,
        price: null
    };

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0], name: this.state.name, price: this.state.price });
    };

    onInputNameChange = event => {
        this.setState({ name: event.target.value, price: this.state.price, selectedFile: this.state.selectedFile })
    }

    onInputPriceChange = event => {
        this.setState({ name: this.state.name, price: event.target.value, selectedFile: this.state.selectedFile })
    }

    
    onProductUpload = (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append(
            "productImage",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        uploadProductImage(formData).then((fileData) => {
            let product = {};
            product.name = this.state.name;
            product.price = this.state.price;
            product.image = fileData.filename;
            uploadProduct(product).then((resp) => {
                if(resp.status === 200)
                    alert("Product Added!!");
                else
                    alert(resp.data);
            });
        });
    };

    render() {

        return (
            <div className="container">
                <hr />
                <div className="col-sm-8 col-sm-offset-2">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3>Product Details </h3>
                        </div>


                        <div className="panel-body">
                            <form onSubmit={this.onProductUpload}>
                                <div className="form-group">
                                    <label>Item Name:</label>
                                    <input type="text" className="form-control" name="name" maxLength="50" onChange={this.onInputNameChange} required/>
                                </div>
                                <div className="form-group">
                                    <label>Item Price:</label>
                                    <input type="number" maxLength="5" className="form-control" name="price" onChange={this.onInputPriceChange} required/>
                                </div>
                                <div className="form-group">
                                    <label>Item Image:</label>
                                    <input type="file" className="form-control" name="file" onChange={this.onFileChange} accept="image/*" required/>
                                    {/* <button onClick={this.onFileUpload}>Upload!</button> */}
                                </div>
                                <button type="submit" className="btn btn-default">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}