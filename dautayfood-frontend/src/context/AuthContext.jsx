// src/context/UserContext.jsx
import { createContext, useContext, useState } from "react";
import { User as UserIcon } from "lucide-react"; // icon mặc định

// 1. Tạo context
const UserContext = createContext();

// 2. Provider
export const UserProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({
        userID: null,
        loginName: "Khách",
        role: "guest", // guest | user | admin
    });

    const [avatarImage, setAvatarImage] = useState(null);

    // avatar cho guest → icon mặc định
    const getInitialAvatar = () => {
        if (profileData.role === "guest") {
            return <UserIcon className="w-fit h-auto text-white" />;
        }
        if (avatarImage) return avatarImage;
        if (profileData?.loginName) return profileData.loginName[0].toUpperCase();
        return "?";
    };

    const login = (user) => {
        setProfileData({
            userID: user.id,
            loginName: user.name,
            role: user.role, // "user" hoặc "admin"
        });
        setAvatarImage(user.avatar || null);
    };

    const logout = () => {
        setProfileData({
            userID: null,
            loginName: "Khách",
            role: "guest",
        });
        setAvatarImage(null);
    };

    return (
        <UserContext.Provider
            value={{
                profileData,
                setProfileData,
                avatarImage,
                setAvatarImage,
                getInitialAvatar,
                login,
                logout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

export default UserContext;
