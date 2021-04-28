import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    console.log(props);
    console.log(props.product);
    const {img, name, seller, price, stock, key} = props.product;
    console.log(name);
    return (
        <div className='product'>
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h3 className='product-name'><Link to={"/product/"+key}>{name}</Link></h3>
                <br/>
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p>Only {stock} left in stock - Order soon</p>
                { props.showAddToCart && <button 
                    className='main-button'
                    onClick={() => props.handleAddProduct(props.product)}
                    > 
                        <FontAwesomeIcon icon={faShoppingCart} />add to cart
                </button>}
            </div>
            
        </div>
    );
};

export default Product;