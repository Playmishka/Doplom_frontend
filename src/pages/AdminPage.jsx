import TableProducts from "../components/TableProducts/TableProducts.jsx";


export default function AdminPage() {
    if (localStorage.getItem("user") !== "admin") {
        return (
            <>
                <h1>Эта страница не доступна!</h1>
            </>
        )
    }
    else{
        return (
            <>
                <TableProducts storehouse="main_storehouse"/>
            </>
        )
    }
}