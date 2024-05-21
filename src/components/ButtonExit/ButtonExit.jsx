import {Button} from "antd";
import {useNavigate} from "react-router-dom";

function ButtonExit() {
    const navigate = useNavigate();

    function Exit() {
        localStorage.clear()
        navigate("/")
    }

    return(
        <>
            <Button size={"large"} type={"primary"} danger onClick={Exit}>Выйти</Button>
        </>
    )
}

export default ButtonExit;