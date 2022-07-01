import BookDetails from "../pages/BookDetails";
import Index from "../pages/Index";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const appRoutes = [
    {
        path: "/",
        element: <Index />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/books/:id",
        element: <BookDetails />
    }
]
export default appRoutes