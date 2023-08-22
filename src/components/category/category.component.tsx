import "./category.styles.scss";
import {Link} from "react-router-dom";
import {CategoryType} from "../categories/categories.component";


export type CategoryPropsType = {
    category: CategoryType
}

export const Category = function ({category}: CategoryPropsType) {
    const {title, imageUrl} = category;
    return (
        <Link to={`shop/${title}`} className="category">
            <div className="category__background" style={
                {backgroundImage: `url(${imageUrl})`}
            }/>
            <div className="category__body">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </Link>
    );
}