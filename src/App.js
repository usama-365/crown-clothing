import {Home} from "./routes/home/home.component";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";

const Navigation = function () {
    return (
        <div>
            <div>
                <h1>This is the navigation bar</h1>
            </div>
            {/* Render the nested routes */}
            <Outlet/>
        </div>
    );
}

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
                path: 'shop',
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