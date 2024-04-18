import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import Page404 from "./pages/Page404.jsx";
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<LoginPage/>}/>
                    <Route path="/user" element={<UserPage />}/>
                    <Route path="/admin" element={<AdminPage/>}/>
                    <Route path={"*"} element={<Page404/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App
