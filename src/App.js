import {Home} from "./routes/home/home.component";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Navigation} from "./routes/navigation/navigation.component";

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
            }
        ]
    }
]);

const App = function () {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;