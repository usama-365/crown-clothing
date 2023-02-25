import {Fragment, useEffect} from "react";
import "./shop.styles.scss";
import {CategoryPreview} from "../../components/category-preview/category-preview.component";
import {useDispatch, useSelector} from "react-redux";
import {selectCategoriesMap} from "../../store/categories/categories.selectors";
import {fetchCategoriesAsync} from "../../store/categories/categories.actions";

export const Shop = function () {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCategoriesAsync());
    }, [dispatch]);
    const categories = useSelector(selectCategoriesMap);
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