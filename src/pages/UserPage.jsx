import UserMenuSegments from "../components/UserMenuSegments/UserMenuSegments.jsx";
import Page404 from "./Page404.jsx";

export default function UserPage() {
    if (localStorage.getItem("user") !== "user") {
        return <Page404/>
    }
    else{
        return (
            <>
                <UserMenuSegments/>
            </>
        )
    }
}