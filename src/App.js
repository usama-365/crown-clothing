import {Home} from "./routes/home/home.route";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Navigation} from "./routes/navigation/navigation.route";
import {SignIn} from "./routes/sign-in/sign-in.route";
import {UserContextProvider} from "./contexts/user.context";
import {Shop} from "./routes/shop/shop.route";
import {CategoriesContextProvider} from "./contexts/categories.context";
import {CartContextProvider} from "./contexts/cart.context";
import {Checkout} from "./routes/checkout/checkout.route";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigation/>,
        errorElement: <p>Invalid URL</p>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "shop",
                children: [
                    {
                        element: <Shop/>,
                        index: true
                    }
                ]
            },
            {
                path: "signin",
                element: <SignIn/>
            },
            {
                path: "checkout",
                element: <Checkout/>
            }
        ]
    }
]);

const App = function () {
    return (
        <UserContextProvider>
            <CategoriesContextProvider>
                <CartContextProvider>
                    <RouterProvider router={router}/>
                </CartContextProvider>
            </CategoriesContextProvider>
        </UserContextProvider>
    );
}

export default App;