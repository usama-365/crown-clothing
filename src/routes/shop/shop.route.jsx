import {Fragment, useEffect} from "react";
import "./shop.styles.scss";
import {CategoryPreview} from "../../components/category-preview/category-preview.component";
import {useDispatch, useSelector} from "react-redux";
import {selectCategoriesIsLoading, selectCategoriesMap} from "../../store/categories/categories.selectors";
import {fetchCategoriesStart} from "../../store/categories/categories.actions";
import {Spinner} from "../../components/spinner/spinner.component";

export const Shop = function () {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectCategoriesIsLoading);
    useEffect(() => {
        dispatch(fetchCategoriesStart());
    }, [dispatch]);
    const categories = useSelector(selectCategoriesMap);
    return (
        <>
            {
                isLoading ? (
                    <Spinner/>
                ) : (
                    Object.keys(categories).map(category => (
                        <Fragment key={category}>
                            <CategoryPreview products={categories[category]} title={category}/>
                        </Fragment>
                    ))
                )
            }
        </>
    );
};