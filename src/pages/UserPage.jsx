import TableProducts from "../components/TableProducts/TableProducts.jsx";

export default function UserPage() {
    if (localStorage.getItem("user") !== "user") {
        return (
            <>
                <h1>Эта страница не доступна!</h1>
            </>
        )
    }
    else{
        return (
            <>
                <TableProducts storehouse="storehouse"/>
            </>
        )
    }
}