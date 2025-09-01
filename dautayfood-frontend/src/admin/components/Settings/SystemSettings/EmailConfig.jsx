// src/components/Settings/EmailConfig.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Mail } from "lucide-react";
import InputField from "../../../components/common/InputField";
import SaveButton from "../../common/SaveButton";

const EmailConfig = ({ onSave, saveStatus }) => {
    const [systemSettings, setSystemSettings] = useState({
        smtpHost: "",
        smtpPort: 587,
        smtpUser: "",
        smtpPassword: "",
    });

    const handleSave = () => {
        onSave("cấu hình email", systemSettings);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Mail className="mr-2 text-red-500" />
                Cấu hình Email SMTP
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    label="SMTP Host"
                    value={systemSettings.smtpHost}
                    onChange={(e) =>
                        setSystemSettings((prev) => ({ ...prev, smtpHost: e.target.value }))
                    }
                    placeholder="smtp.gmail.com"
                />

                <InputField
                    label="SMTP Port"
                    type="number"
                    value={systemSettings.smtpPort}
                    onChange={(e) =>
                        setSystemSettings((prev) => ({
                            ...prev,
                            smtpPort: parseInt(e.target.value),
                        }))
                    }
                    placeholder="587"
                />

                <InputField
                    label="SMTP Username"
                    value={systemSettings.smtpUser}
                    onChange={(e) =>
                        setSystemSettings((prev) => ({ ...prev, smtpUser: e.target.value }))
                    }
                    placeholder="your-email@gmail.com"
                />

                <InputField
                    label="SMTP Password"
                    type="password"
                    value={systemSettings.smtpPassword}
                    onChange={(e) =>
                        setSystemSettings((prev) => ({
                            ...prev,
                            smtpPassword: e.target.value,
                        }))
                    }
                    placeholder="App Password"
                />
            </div>

            <div className="flex space-x-4 mt-6">
                <button
                    onClick={() => alert("Đang gửi email thử nghiệm...")}
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 flex items-center space-x-2"
                >
                    <Mail size={18} />
                    <span>Gửi thử</span>
                </button>

                <SaveButton
                    onClick={handleSave}
                    saveStatus={saveStatus}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
                >
                    Lưu cài đặt
                </SaveButton>
            </div>
        </div>
    );
};

EmailConfig.propTypes = {
    onSave: PropTypes.func.isRequired,
    saveStatus: PropTypes.string,
};

export default EmailConfig;
