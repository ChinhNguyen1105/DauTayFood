import { createContext, useState } from "react";

const UserContext = createContext();

const initialData = {
    userID: "123456789",
    loginName: "ChinhNguyen1152k5",
    email: "Chinhnguyen115@gmail.com",
    phone: "123456789",
    gender: "Nam",
    day: "11",
    month: "05",
    year: "2005",
};

export const UserProvider = ({ children }) => {
    const [profileData, setProfileData] = useState(initialData);
    const [avatarImage, setAvatarImage] = useState(null);

    const getInitialAvatar = () =>
        profileData.loginName.charAt(0).toUpperCase();

    return (
        <UserContext.Provider
            value={{
                profileData,
                setProfileData,
                avatarImage,
                setAvatarImage,
                getInitialAvatar,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
