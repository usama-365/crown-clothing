import {Fragment, useEffect} from "react";
import "./shop.styles.scss";
import {CategoryPreview} from "../../components/category-preview/category-preview.component";
import {getCategoriesAndDocuments} from "../../services/firebase/firebase.service";
import {setCategories} from "../../store/categories/categories.actions";
import {useDispatch, useSelector} from "react-redux";
import {selectCategoriesMap} from "../../store/categories/categories.selectors";

export const Shop = function () {
    const dispatch = useDispatch();
    useEffect(() => {
        getCategoriesAndDocuments().then(categories => dispatch(setCategories(categories)));
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