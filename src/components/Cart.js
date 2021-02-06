import React from 'react';
import { getCartProducts } from '../repository';
import CartItem from './CartItem';

export default class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			total: 0
		}
	}

	componentWillMount() {
		let cart = localStorage.getItem('cart');
		if (!cart) return; 
		getCartProducts(cart).then((products) => {
			let total = 0;
			for (var i = 0; i < products.length; i++) {
				total += products[i].price * products[i].qty;
			}
	    	this.setState({ products, total });
	    });
	}
	
	addToCart = (product) => {
		let products = this.state.products.filter((item) => item.id !== product.id);
		let cart = JSON.parse(localStorage.getItem('cart'));
		let id = product.id.toString();
		let quantity = cart[id] + 1;
		cart[id] = quantity;
		localStorage.setItem('cart', JSON.stringify(cart));
		let total = parseInt(this.state.total) + parseInt(product.price);
		this.setState({products, total});
	}

	removeFromCart = (product) => {
		let products = this.state.products.filter((item) => item.id !== product.id);
		let cart = JSON.parse(localStorage.getItem('cart'));
		let id = product.id.toString();
		let quantity = cart[id] - 1;
		if(quantity <= 0) {
			delete cart[product.id.toString()];
		}
		else 
			cart[id] = quantity;
		localStorage.setItem('cart', JSON.stringify(cart));
		let total = parseInt(this.state.total) - parseInt(product.price);
		this.setState({products, total});
	}

	removeAllFromCart = (product) => {
		let products = this.state.products.filter((item) => item.id !== product.id);
		let cart = JSON.parse(localStorage.getItem('cart'));
		delete cart[product.id.toString()];
		localStorage.setItem('cart', JSON.stringify(cart));
		let total = this.state.total - (product.qty * product.price) 
		this.setState({products, total});
	}

	clearCart = () => {
		localStorage.removeItem('cart');
		this.setState({products: []});
	}

	render() {
		const { products, total } =  this.state;
		return (
			<div className=" container">
				<h3 className="card-title">Cart</h3>
				<hr/>
				{
					products.map((product, index) => <CartItem product={product} removeAll={this.removeAllFromCart} add={this.addToCart} remove={this.removeFromCart} key={index}/>)
				}
				<hr/>
				{ products.length ? <div><h4><small>Total Amount:</small><span className="float-right text-primary">${total}</span></h4><hr/></div>: ''}

				{ !products.length ? <h3 className="text-warning">No item on the cart</h3>: ''}
				<button className="btn btn-danger float-right" onClick={this.clearCart} style={{ marginRight: "10px" }}>Clear Cart</button>
				<br/><br/><br/>
			</div>
		);
	}
}
