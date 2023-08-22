import "./category-preview.styles.scss";
import {ProductCard} from "../product-card/product-card.component";
import {Link} from "react-router-dom";
import {CategoryItemType} from "../../store/categories/categories.types";

export type CategoryPreviewPropsType = {
    title: string,
    products: CategoryItemType[]
}

export const CategoryPreview = function ({title, products}: CategoryPreviewPropsType) {
    return (
        <div className="category-preview">
            <h2 className="category-preview__title">
                <Link to={`${title}`} className="category-preview__text">{title.toUpperCase()}</Link>
            </h2>
            <div className="category-preview__items">
                {products.filter((_, index) => index < 4).map(product => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </div>
    );
};