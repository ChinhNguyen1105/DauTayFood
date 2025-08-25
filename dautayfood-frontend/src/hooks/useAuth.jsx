import { useContext } from "react";
import UserContext from "../context/AuthContext";

const useUser = () => {
    return useContext(UserContext);
};

export default useUser;
