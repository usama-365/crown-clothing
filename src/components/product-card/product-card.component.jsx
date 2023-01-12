import "./product-card.styles.scss";
import {Button} from "../button/button.component";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";

export const ProductCard = function ({product}) {
    const {name, price, imageUrl} = product;
    const {addProductToCart} = useContext(CartContext);

    const addToCartHandler = () => addProductToCart(product);

    return (
        <div className="product-card">
            <img src={imageUrl} alt={name} className="product-card__img"/>
            <div className="product-card__footer">
                <span className="product-card__name">{name}</span>
                <span className="product-card__price">{price}</span>
            </div>
            <Button buttonAttributes={{onClick: addToCartHandler}} buttonType="inverted">Add to cart</Button>
        </div>
    );
};