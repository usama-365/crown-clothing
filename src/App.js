import {Home} from "./routes/home/home.component";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    }
]);

const App = function () {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;