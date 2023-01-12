import {Fragment, useContext} from "react";
import {CategoriesContext} from "../../contexts/categories.context";
import {ProductCard} from "../../components/product-card/product-card.component";
import "./shop.styles.scss";

export const Shop = function () {
    const {categories} = useContext(CategoriesContext);
    return (
        <>
            {Object.keys(categories).map(category => (
                <Fragment key={category}>
                    <h2>{category}</h2>
                    <div className="products">
                        {categories[category].map(product => (
                            <ProductCard key={product.id} product={product}/>)
                        )}
                    </div>
                </Fragment>
            ))}
        </>
    );
};