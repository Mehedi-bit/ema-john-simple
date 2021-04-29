import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {

    const [cart, setCart] = useState([]);
    useEffect(()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cardProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            console.log(product);
            return product;
        });
        setCart(cardProducts);
    }, [])
    return (
        <div>
            <h1>Cart items: {cart.length}</h1>
            {
                cart.map(pd => <ReviewItem product={pd}
                                            key={pd.key}></ReviewItem>)
            }
        </div>
    );
};

export default Review;