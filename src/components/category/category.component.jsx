import "./category.styles.scss";

export const Category = function ({category}) {
    const {title, imageUrl} = category;
    return (
        <div className="category">
            <div className="category__background" style={
                {backgroundImage: `url(${imageUrl})`}
            }/>
            <div className="category__body">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    );
}