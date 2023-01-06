import {Category} from "../category/category.component";
import "./categories.styles.scss";

export const Categories = function ({categories}) {
    return (
        <div className="categories">
            {categories.map(category => (<Category key={category.id} category={category}/>))}
        </div>
    );
}