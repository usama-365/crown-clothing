import './product-card.styles.scss';
import {Button} from "../button/button.component";

export const ProductCard = function ({ product }) {
    const { name, price, imageUrl } = product;
    return (
        <div className="product-card">
            <img src={imageUrl} alt={name} className="product-card__img"/>
            <div className="product-card__footer">
                <span className="product-card__name">{name}</span>
                <span className="product-card__price">{price}</span>
            </div>
            <Button buttonType="inverted">Add to cart</Button>
        </div>
    );
};