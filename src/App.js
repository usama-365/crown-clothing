const App = function () {
    const categories = [
        {
            id: 1,
            title: "Hats"
        },
        {
            id: 2,
            title: "Jackets"
        },
        {
            id: 3,
            title: "Sneakers"
        },
        {
            id: 4,
            title: "Womens"
        },
        {
            id: 5,
            title: "Mens"
        },
    ];
    return (
        <div className="categories">
            {categories.map(category => (
                <div className="category">
                    <div className="category__background" />
                    <div className="category__body">
                        <h2>{category.title}</h2>
                        <p>Shop Now</p>
                    </div>
                </div>
            ))}
        </div>
    );
}


export default App;
