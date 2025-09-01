import { useState } from "react";
import { User, Shield, Settings } from "lucide-react"; // icon minh họa
import TabButton from "../components/Common/TabButton";

// Account Security
import AccountInfor from "../components/Settings/AccountSecurity/AccountInfor";
import PasswordChange from "../components/Settings/AccountSecurity/PasswordChange";
import SessionManager from "../components/Settings/AccountSecurity/SessionManager";
import TwoFactorAuth from "../components/Settings/AccountSecurity/TwoFactorAuth";

// Advanced Settings
import BackupRestore from "../components/Settings/AdvancedSettings/BackupRestore";
import RoleManager from "../components/Settings/AdvancedSettings/RoleManager";

// System Settings
import CurrencyTax from "../components/Settings/SystemSettings/CurrencyTax";
import EmailConfig from "../components/Settings/SystemSettings/EmailConfig";
import LanguageTime from "../components/Settings/SystemSettings/LanguageTime";
import NotificationSettings from "../components/Settings/SystemSettings/NotificationSetting";
import SystemStatus from "../components/Settings/SystemSettings/SystemStatus";

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState("account");
    const [saveStatus, setSaveStatus] = useState("");

    const handleSave = (section) => {
        setSaveStatus("saving");
        setTimeout(() => {
            setSaveStatus("success");
            setTimeout(() => setSaveStatus(""), 3000);
        }, 1000);
    };

    return (
        <div className="p-6">
            {/* Tabs */}
            <div className="flex flex-wrap gap-4 mb-8">
                <TabButton
                    id="account"
                    label="Tài khoản"
                    icon={User}
                    active={activeTab === "account"}
                    onClick={() => setActiveTab("account")}
                />
                <TabButton
                    id="advanced"
                    label="Nâng cao"
                    icon={Shield}
                    active={activeTab === "advanced"}
                    onClick={() => setActiveTab("advanced")}
                />
                <TabButton
                    id="system"
                    label="Hệ thống"
                    icon={Settings}
                    active={activeTab === "system"}
                    onClick={() => setActiveTab("system")}
                />
            </div>

            {/* Content */}
            <div className="space-y-8">
                {activeTab === "account" && (
                    <>
                        <AccountInfor onSave={handleSave} saveStatus={saveStatus} />
                        <PasswordChange onSave={handleSave} saveStatus={saveStatus} />
                        <TwoFactorAuth onSave={handleSave} saveStatus={saveStatus} />
                        <SessionManager onLogout={(id) => console.log("Đã đăng xuất session:", id)} />
                    </>
                )}

                {activeTab === "advanced" && (
                    <>
                        <BackupRestore onSave={handleSave} saveStatus={saveStatus} />
                        <RoleManager onSave={handleSave} saveStatus={saveStatus} />
                    </>
                )}

                {activeTab === "system" && (
                    <>
                        <CurrencyTax
                            systemSettings={SystemStatus}

                            onSave={handleSave}
                            saveStatus={saveStatus}
                        />
                        <EmailConfig onSave={handleSave} saveStatus={saveStatus} />
                        <LanguageTime onSave={handleSave} saveStatus={saveStatus} />
                        <NotificationSettings
                            onSave={handleSave}
                            saveStatus={saveStatus}
                        />
                        <SystemStatus
                            systemStatus={{
                                cpu: 45,
                                memory: 68,
                                disk: 72,
                                uptime: "12d 5h",
                            }}
                        />

                    </>
                )}
            </div>
        </div>
    );
};

export default AdminSettings;
