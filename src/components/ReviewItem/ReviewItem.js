import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, price} = props.product;
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
            <br/>
            <button className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;