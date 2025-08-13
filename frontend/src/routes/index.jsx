import Home from "@/pages/landing/Home"
import Signin from "@/pages/auth/Signin";
import Signup from "@/pages/auth/Signup";

const routes = [
    { path: "/", element: <Home /> },
    { path: "/signin", element: <Signin /> },
    { path: "/signup", element: <Signup /> },
]

export default routes;