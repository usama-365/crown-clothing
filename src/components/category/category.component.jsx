import "./category.styles.scss";
import {Link} from "react-router-dom";

export const Category = function ({category}) {
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