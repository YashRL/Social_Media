import { useEffect, useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";

const useLoggedInUser = () => {
    const { user } = useUserAuth();
    const email = user?.email;
    const [loggedInUser, setLoggedInUser] = useState({});

    useEffect(() => {
        fetch(`https://pacific-peak-30751.herokuapp.com/loggedInUser?email=${email}`)
            .then(res => res.json())
            .then(data => {
                // console.log('from useLoggedinuser', data)
                setLoggedInUser(data)
            })
    }, [email, loggedInUser])

    return [loggedInUser, setLoggedInUser];
}

export default useLoggedInUser