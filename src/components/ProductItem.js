import React from 'react';

export default class ProductItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			quantity: 1
		}
	}

	//handleInputChange = event => this.setState({[event.target.name]: event.target.value})

	addToCart = () => {
		let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
		let id = this.props.product.id.toString();
		cart[id] = (cart[id] ? cart[id] : 0);
		if (cart[id]) {
			alert("Item already exsists in cart!!!")
		}
		else {
			cart[id] = 1;
			localStorage.setItem('cart', JSON.stringify(cart));
			alert("Item added to cart!!!")
		}
	}

	render() {
		const { product } = this.props;
		return (
			<div className="col-sm-4 col-md-3">
				<div className="card">
					<img className="card-img-top" src={process.env.PUBLIC_URL + '/uploads/' + product.image} alt="product" ></img>
					<div className="card-body">
						<h5 className="card-title">{product.name}</h5>
						<h5 className="card-text">${product.price}</h5>
						<button className="btn btn-sm btn-warning" onClick={this.addToCart}>Add to cart</button>
						{/* <input type="number" value={this.state.quantity} name="quantity" onChange={this.handleInputChange} className="float-right" style={{ width: "60px", marginRight: "10px", borderRadius: "3px"}}/> */}
					</div>
				</div>
			</div>
		)
	}
}
