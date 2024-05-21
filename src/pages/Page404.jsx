import Background from "../static/LoginPage/Background.jpeg"

export default function Page404() {
    const Style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url(" + Background + ")",
        backgroundSize: "cover",
        fontSize: 40
    }

    return(
        <>
            <div style={Style}>
                <h1 style={{color: "white"}}>Страница не найдена!</h1>
            </div>
        </>
    )
}