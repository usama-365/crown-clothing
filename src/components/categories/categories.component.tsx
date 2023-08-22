import {Category} from "../category/category.component";
import "./categories.styles.scss";


export type CategoryType = {
    id: number,
    title: string,
    imageUrl: string
}

export type CategoriesPropsType = {
    categories: CategoryType[]
}

export const Categories = function ({categories}: CategoriesPropsType) {
    return (
        <div className="categories">
            {categories.map(category => (<Category key={category.title} category={category}/>))}
        </div>
    );
}