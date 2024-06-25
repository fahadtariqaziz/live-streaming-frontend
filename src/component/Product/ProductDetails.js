import React, { Fragment, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import "./ProductDetails.css";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getProductDetails } from '../../actions/productAction';

import ReactStars from "react-rating-stars-component";
import ReviewCard from './ReviewCard.js';
import Loader from '../layout/Loader/Loader.js';
import {useAlert} from 'react-alert';
import MetaData from '../layout/MetaData.js';
import { useState } from 'react';     //options ke neeche quantity setQuantity kare ge
import {addItemsToCart} from "../../actions/cartAction.js"

const ProductDetails = () => {
    const dispatch = useDispatch();
    const alert = useAlert();    //isko useEffect men he use kare ge
    const { id } = useParams();
    const { product, loading, error } = useSelector((state) => state.productDetails);

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors() );    //return hata ke ye clear error use  ek dfa alert kar dia phir clear error use karke error khtam kar  ske      or ye home wale men bhi kare ge
        } 
        dispatch(getProductDetails(id));
    }, [dispatch,error, id,alert]);


    const options = {
        edit : false,   //stars select ni honge edit false se
        color: "rgba(20,20,20,0,1)",
        activeColor : "tomato",
        size : window.innerWidth < 600 ? 20 : 25,
        //value : 2.5,
        value : product.ratings,      //ye value access ni ho rae kyu ke loader ni lagaya load hone se pehle he component load ho jata   loading oper import destructure hai wo use karke condition laga den ge    tou pore fragment ko ctrl x then loadung men rakh do
        isHalf : true,
    
    };


    const [quantity , setQuantity] = useState(1);

    const increaseQuantity = () => {
        if (product.stock <= quantity)
        return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity)
        return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {      //ye arrow function hai  iske andar dispatch addItemsTocat matlab action ko dispatch
        dispatch(addItemsToCart( id , quantity));     //isme id deni thi  or quantity   id ajaye gi params se
        alert.success("Item Added To Cart");  //ye alert wohi jo bottom pe alert hota
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (<Fragment>

                <MetaData title = {`${product.name} --FAHAD`}/>

            <div className='ProductDetails'>
                
                <div>
                    <Carousel>
                        {product.images && // Add conditional check for product and product.images
                            product.images.map((item, i) => (
                                <img
                                    className='CarouselImage'
                                    key={item.url}
                                    src={item.url}
                                    alt={`${i} Slide`}
                                />
                            ))
                        }
                    </Carousel>
                </div>


                <div>
                    <div className='detailsBlock-1'>
                        <h2>{product.name}</h2>
                        <p>Product # {product._id}</p>
                    </div>
                    
                    <div className='detailsBlock-2'>
                        <ReactStars {...options} />
                        <span> ({product.numOfReviews} Reviews)</span>
                        
                    </div>

                    <div className='detailsBlock-3'>
                        <h1> { `Rs ${product.price}` } </h1>
                    </div>


                    <div className='detailsBlock-3-1'>
                        <div className='detailsBlock-3-1-1'>
                            <button onClick={decreaseQuantity}>-</button>
                            <input readOnly value={quantity} type="number"/>
                            <button onClick={increaseQuantity}>+</button>
                        </div>
                        <button onClick={addToCartHandler}>Add to Cart</button>
                    </div>

                    <p>
                        Status:
                        <b className={product.Stock < 1 ? "redColor" : "greenColor"}> {product.Stock < 1 ? "OutOfStock" : "InStock"} </b>
                    </p>

                    <div className='detailsBlock-4'>
                       Description : <p> {product.description} </p>
                       </div>
                

                <button className='submitReview'> Submit Review </button>
            </div>
            </div>

            <h3 className='reviewsHeading' >REVIEWS</h3>

            {product.reviews && product.reviews[0] ? (
                <div className='reviews'>
                    {product.reviews && product.reviews.map((review) => <ReviewCard review = {review}  />)}
                </div>
            ) : ( <p className='noRwviews'> No Reviews Yet</p>)}
        </Fragment>)}
        </Fragment>
    );
};

export default ProductDetails;
