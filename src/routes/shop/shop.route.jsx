import {Fragment, useContext} from "react";
import {CategoriesContext} from "../../contexts/categories.context";
import "./shop.styles.scss";
import {CategoryPreview} from "../../components/category-preview/category-preview.component";

export const Shop = function () {
    const {categories} = useContext(CategoriesContext);
    return (
        <>
            {Object.keys(categories).map(category => (
                <Fragment key={category}>
                    <CategoryPreview products={categories[category]} title={category}/>
                </Fragment>
            ))}
        </>
    );
};