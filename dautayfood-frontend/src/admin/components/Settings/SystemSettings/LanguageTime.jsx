import React, { useState } from "react";
import PropTypes from "prop-types";
import { Globe } from "lucide-react";
import SaveButton from "../../common/SaveButton";

const LanguageTime = ({ onSave, saveStatus }) => {
    const [settings, setSettings] = useState({
        language: "vi",
        timezone: "Asia/Ho_Chi_Minh",
    });

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Globe className="mr-2 text-blue-500" />
                Ngôn ngữ &amp; Múi giờ
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ngôn ngữ */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Ngôn ngữ</label>
                    <select
                        value={settings.language}
                        onChange={(e) =>
                            setSettings((prev) => ({ ...prev, language: e.target.value }))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="vi">🇻🇳 Tiếng Việt</option>
                        <option value="en">🇺🇸 English</option>
                        <option value="zh">🇨🇳 中文</option>
                        <option value="ja">🇯🇵 日本語</option>
                    </select>
                </div>

                {/* Múi giờ */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Múi giờ</label>
                    <select
                        value={settings.timezone}
                        onChange={(e) =>
                            setSettings((prev) => ({ ...prev, timezone: e.target.value }))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="Asia/Ho_Chi_Minh">Việt Nam (GMT+7)</option>
                        <option value="Asia/Bangkok">Thailand (GMT+7)</option>
                        <option value="Asia/Singapore">Singapore (GMT+8)</option>
                        <option value="Asia/Tokyo">Japan (GMT+9)</option>
                        <option value="UTC">UTC (GMT+0)</option>
                    </select>
                </div>
            </div>

            <SaveButton
                onClick={() => onSave("ngôn ngữ & múi giờ", settings)}
                saveStatus={saveStatus}
                className="mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
            >
                Lưu cài đặt
            </SaveButton>
        </div>
    );
};

LanguageTime.propTypes = {
    onSave: PropTypes.func.isRequired,
    saveStatus: PropTypes.string,
};

export default LanguageTime;
