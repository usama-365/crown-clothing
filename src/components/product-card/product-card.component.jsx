import "./product-card.styles.scss";
import {Button} from "../button/button.component";
import {addProductToCart} from "../../store/cart/cart.actions";
import {useDispatch, useSelector} from "react-redux";
import {selectCartItems} from "../../store/cart/cart.selectors";

export const ProductCard = function ({product}) {
    const {name, price, imageUrl} = product;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const addToCartHandler = () => dispatch(addProductToCart(cartItems, product));

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