import "./category-items.styles.scss";
import {useParams} from "react-router-dom";
import {useContext} from "react";
import {CategoriesContext} from "../../contexts/categories.context";
import {ProductCard} from "../product-card/product-card.component";

export const CategoryItems = function () {
    const {category} = useParams();
    const {categories} = useContext(CategoriesContext);
    return (
        <>
            <h2 className="category-items__title">{category}</h2>
            <div className="category-items__items">
                {categories[category].map(product => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </>
    );
};