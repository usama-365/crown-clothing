import {Home} from "./routes/home/home.route";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Navigation} from "./routes/navigation/navigation.route";
import {SignIn} from "./routes/sign-in/sign-in.route";
import {UserContextProvider} from "./contexts/user.context";
import {Shop} from "./routes/shop/shop.route";
import {ProductsContextProvider} from "./contexts/products.context";
import {CartContextProvider} from "./contexts/cart.context";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigation/>,
        errorElement: <p>Route doesn't exist</p>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "shop",
                element: <Shop/>
            },
            {
                path: "signin",
                element: <SignIn/>
            }
        ]
    }
]);

const App = function () {
    return (
        <UserContextProvider>
            <ProductsContextProvider>
                <CartContextProvider>
                    <RouterProvider router={router}/>
                </CartContextProvider>
            </ProductsContextProvider>
        </UserContextProvider>
    );
}

export default App;