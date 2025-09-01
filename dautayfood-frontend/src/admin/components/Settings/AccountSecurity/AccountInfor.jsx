import { useState } from "react";
import PropTypes from "prop-types";
import { User, Camera, CheckCircle, Mail, Smartphone } from "lucide-react";
import InputField from "../../common/InputField";
import SaveButton from "../../common/SaveButton";

const AccountInfor = ({ onSave, saveStatus }) => {
    const [accountData, setAccountData] = useState({
        avatar: null,
        name: "",
        email: "",
        phone: "",
    });

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAccountData((prev) => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <User className="mr-2 text-blue-500" />
                Thông tin cá nhân
            </h3>

            {/* Avatar */}
            <div className="flex items-center space-x-6 mb-6">
                <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden">
                        {accountData.avatar ? (
                            <img
                                src={accountData.avatar}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User size={32} className="text-white" />
                        )}
                    </div>
                    <label className="absolute -bottom-2 -right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer transition-colors shadow-lg">
                        <Camera size={14} />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            className="hidden"
                        />
                    </label>
                </div>

                <div>
                    <h4 className="font-semibold text-gray-800 text-lg">
                        {accountData.name || "Chưa có tên"}
                    </h4>
                    <p className="text-gray-500">{accountData.email || "Chưa có email"}</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 mt-1">
                        <CheckCircle size={12} className="mr-1" />
                        Đã xác thực
                    </span>
                </div>
            </div>

            {/* Input fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    label="Họ và tên"
                    value={accountData.name}
                    onChange={(e) =>
                        setAccountData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    icon={User}
                    error={
                        accountData.name.length < 2 ? "Tên phải có ít nhất 2 ký tự" : ""
                    }
                />
                <InputField
                    label="Email"
                    type="email"
                    value={accountData.email}
                    onChange={(e) =>
                        setAccountData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    icon={Mail}
                    error={
                        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accountData.email)
                            ? "Email không hợp lệ"
                            : ""
                    }
                />
                <InputField
                    label="Số điện thoại"
                    value={accountData.phone}
                    onChange={(e) =>
                        setAccountData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    icon={Smartphone}
                    error={
                        !/^\+84\s?\d{9,10}$/.test(accountData.phone)
                            ? "Số điện thoại không hợp lệ"
                            : ""
                    }
                />
            </div>

            {/* Save button */}
            <SaveButton
                onClick={() => onSave(accountData)}
                className="mt-6 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                loading={saveStatus === "loading"}
                success={saveStatus === "success"}
                error={saveStatus === "error"}
            >
                Lưu thay đổi
            </SaveButton>
        </div>
    );
};

AccountInfor.propTypes = {
    onSave: PropTypes.func.isRequired,
    saveStatus: PropTypes.oneOf(["idle", "loading", "success", "error"]),
};

AccountInfor.defaultProps = {
    saveStatus: "idle",
};

export default AccountInfor;
