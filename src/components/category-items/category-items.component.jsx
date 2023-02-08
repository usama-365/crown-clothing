import "./category-items.styles.scss";
import {useParams} from "react-router-dom";
import {ProductCard} from "../product-card/product-card.component";
import {useSelector} from "react-redux";

export const CategoryItems = function () {
    const {category} = useParams();
    const categories = useSelector(state => state.categories.categoriesMap);
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