import axios from "axios";
import {useNavigation} from "react-router-dom";

function GetTableStorehouse(setter) {
    const navigate = useNavigation();

    axios.get(
        // eslint-disable-next-line react/prop-types
        "http://localhost:8000/storehouse/storehouse",
        {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        }
    ).then(r => setter(r.data))
        .catch(error => {
            if (error.response.status === 401 && error.response) {
                navigate("/")
            }
        })
}

export default GetTableStorehouse;