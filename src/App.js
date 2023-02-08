import {Home} from "./routes/home/home.route";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Navigation} from "./routes/navigation/navigation.route";
import {SignIn} from "./routes/sign-in/sign-in.route";
import {Shop} from "./routes/shop/shop.route";
import {Checkout} from "./routes/checkout/checkout.route";
import {CategoryItems} from "./components/category-items/category-items.component";
import {useEffect} from "react";
import {onAuthStateChangedListener} from "./services/firebase/firebase.service";
import {setCurrentUser} from "./store/user/user.action";
import {useDispatch} from "react-redux";

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
                    },
                    {
                        path: ":category",
                        element: <CategoryItems/>
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
    const dispatch = useDispatch();
    useEffect(() => {
        return onAuthStateChangedListener((user) => {
            dispatch(setCurrentUser(user));
        });
    }, [dispatch]);
    return (
        <RouterProvider router={router}/>
    );
}

export default App;