import Home from "@/pages/landing/Home"
import Signin from "@/pages/auth/Signin";

const routes = [
    { path: "/", element: <Home /> },
    { path: "/signin", element: <Signin /> },
]

export default routes;