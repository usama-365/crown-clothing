import "./category-items.styles.scss";
import {useParams} from "react-router-dom";
import {ProductCard} from "../product-card/product-card.component";
import {useSelector} from "react-redux";
import {selectCategoriesIsLoading, selectCategoriesMap} from "../../store/categories/categories.selectors";
import {Spinner} from "../spinner/spinner.component";

export const CategoryItems = function () {
    const {category} = useParams();
    const isLoading = useSelector(selectCategoriesIsLoading);
    const categories = useSelector(selectCategoriesMap);
    if (category)
        return (
            <>
                <h2 className="category-items__title">{category}</h2>
                {
                    isLoading || !categories[category] ? (
                        <Spinner/>
                    ) : (
                        <div className="category-items__items">
                            {categories[category].map(product => (
                                <ProductCard key={product.id} product={product}/>
                            ))}
                        </div>
                    )
                }

            </>
        );
};