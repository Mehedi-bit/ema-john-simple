import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, price, key} = props.product;
    const handleRemoveProduct = props.handleRemoveProduct;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        padding: '10px',
        marginBottom: '5px',
        marginLeft: '200px'
    }
    return (
        <div style={reviewItemStyle} className="review-item">
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>Price: {price}$</small></p>
            <br/>
            <button 
                className="main-button"
                onClick={() => handleRemoveProduct(key)}
            >Remove</button>
        </div>
    );
};

export default ReviewItem;