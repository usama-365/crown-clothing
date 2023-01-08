import {useContext} from "react";
import {ProductsContext} from "../../contexts/products.context";

export const Shop = function () {
    const {products} = useContext(ProductsContext);
    return (
        <div>
            {products.map(({id, name}) => (
                <div key={id}>
                    <h1>{name}</h1>
                </div>
            ))}
        </div>
    );
};