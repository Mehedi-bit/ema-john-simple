import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';


const ProductDetail = () => {
    const {productKey} = useParams();
    const product = fakeData.filter(pd => pd.key === productKey);
    console.log(product);
    return (
        <div>
            <h1>Your product details</h1>
            <Product showAddToCart={false} product={product[0]}></Product>
        </div>
    );
};

export default ProductDetail;