import {Home} from "./routes/home/home.route";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Navigation} from "./routes/navigation/navigation.route";
import {SignIn} from "./routes/sign-in/sign-in.route";
import {UserContextProvider} from "./contexts/user.context";

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
                element: <p>This is shop</p>
            },
            {
                path: 'signin',
                element: <SignIn />
            }
        ]
    }
]);

const App = function () {
    return (
        <UserContextProvider>
            <RouterProvider router={router}/>
        </UserContextProvider>
    );
}

export default App;