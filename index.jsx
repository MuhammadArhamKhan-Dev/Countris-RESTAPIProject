import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import Home from "./components/Home"
import CountryDetail from "./components/CountryDetail"
import Error from "./components/Error"

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/:country',
                element: <CountryDetail />
            }
        ]
    },
    {
        path: '*',
        element: <Error />
    }

])

const root = createRoot(document.querySelector("#root"))
root.render(<RouterProvider router={router} />)