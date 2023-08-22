import "./product-card.styles.scss";
import {Button, BUTTON_TYPES_CLASS} from "../button/button.component";
import {addProductToCart} from "../../store/cart/cart.actions";
import {useDispatch, useSelector} from "react-redux";
import {selectCartItems} from "../../store/cart/cart.selectors";
import {CategoryItemType} from "../../store/categories/categories.types";

export type ProductCardPropsType = {
    product: CategoryItemType
}

export const ProductCard = function ({product}: ProductCardPropsType) {
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
            <Button buttonAttributes={{onClick: addToCartHandler}} buttonType={BUTTON_TYPES_CLASS.inverted}>Add to
                cart</Button>
        </div>
    );
};