import Authentication from "../components/Authentication/Authentication.jsx";
import Background from "../static/LoginPage/Background.jpeg"

export default function LoginPage() {
    const Style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url(" + Background + ")",
        backgroundSize: "cover",
    }
    return(
        <>
            <div style={Style}>
                <Authentication/>
            </div>
        </>

    )
}