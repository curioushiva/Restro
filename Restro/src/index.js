import ReactDOM from "react-dom/client";
import useRes from "./hooks/reshook/useRes";
let indexRoot = document.getElementById("root");
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { Provider,useSelector } from "react-redux";
import appStore from "./redux/appstore/appStore";
import Header from "./components/Layout/Header/Header";
import Main from "./components/Layout/Main/Main";
import Footer from "./components/Layout/Footer/Footer";
import ResMenu from "./components/Res/ResMenu/ResMenu";
import Location from "./components/Location/Location";
import About from "./components/About/About";
import Account from "./components/Account/Account";
import Orders from "./components/Orders/Orders";
import Cart from "./components/Cart/Cart";
import useStatus from "./hooks/statushook/useStatus";
import Error from "./components/Error/Error";
import Offline from "./components/Offline/Offline";

const App = () => {
    const onlineStatus = useStatus();
    const LocationPicker = useSelector((store) => store.address.LocationPicker);
    useRes();

    if (onlineStatus === false) {
        return (
            <div>
                <Header />
                <Offline />
                <Footer />
            </div>
        );
    }

    return (
        <div className="app">
            {LocationPicker? <Location /> : null}
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Main />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/account",
                element: <Account />
            },
            {
                path: "/restaurant/:resId",
                element: <ResMenu />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/orders",
                element: <Orders />
            },
        ],
        errorElement: <Error />
    }
])

const root = ReactDOM.createRoot(indexRoot);
root.render(
    <Provider store={appStore}>
        <RouterProvider router={appRouter} />
    </Provider>
);
