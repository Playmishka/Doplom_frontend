import UserMenuSegments from "../components/UserMenuSegments/UserMenuSegments.jsx";
import Page404 from "./Page404.jsx";
export default function AdminPage() {
    if (localStorage.getItem("user") !== "admin") {
        return <Page404/>
    }
    else{
        return (
            <>
                <div>
                    <UserMenuSegments/>
                </div>
            </>
        )
    }
}