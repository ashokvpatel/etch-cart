import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export function getProducts() {
	return axios.get(`${BASE_URL}/api/products`)
		.then(response => response.data);
}

export function getCartProducts(cart) {
	return axios.post(`${BASE_URL}/api/cartproducts`, {cart})
		.then(response => response.data);
}

export function uploadProductImage(data) {
	return axios.post(`${BASE_URL}/api/uploadfile`, data)
		.then(response => response.data);
}

export function uploadProduct(data) {
	return axios.post(`${BASE_URL}/api/product`, data)
		.then(response => response)
		.catch(error => error.response);
}
