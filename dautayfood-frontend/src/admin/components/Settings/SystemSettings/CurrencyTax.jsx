// src/components/Settings/CurrencyTax.jsx
import React from "react";
import PropTypes from "prop-types";
import { DollarSign } from "lucide-react";
import InputField from "../../common/InputField";
import SaveButton from "../../common/SaveButton";

const CurrencyTax = ({ systemSettings, setSystemSettings, onSave, saveStatus }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <DollarSign className="mr-2 text-green-500" />
                Tiền tệ & Thuế
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Tiền tệ */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Tiền tệ mặc định
                    </label>
                    <select
                        value={systemSettings.currency}
                        onChange={(e) =>
                            setSystemSettings((prev) => ({ ...prev, currency: e.target.value }))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="VND">VND (₫)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="JPY">JPY (¥)</option>
                    </select>
                </div>

                {/* VAT */}
                <InputField
                    label="Thuế VAT (%)"
                    type="number"
                    value={systemSettings.vatRate}
                    onChange={(e) =>
                        setSystemSettings((prev) => ({
                            ...prev,
                            vatRate: parseFloat(e.target.value),
                        }))
                    }
                    min="0"
                    max="100"
                    step="0.1"
                />

                {/* Phí vận chuyển */}
                <InputField
                    label="Phí vận chuyển mặc định (VND)"
                    type="number"
                    value={systemSettings.defaultShippingFee}
                    onChange={(e) =>
                        setSystemSettings((prev) => ({
                            ...prev,
                            defaultShippingFee: parseInt(e.target.value),
                        }))
                    }
                    min="0"
                />
            </div>

            <SaveButton
                onClick={() => onSave("tiền tệ & thuế")}
                status={saveStatus}
                className="mt-6 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
            >
                Lưu cài đặt
            </SaveButton>
        </div>
    );
};

CurrencyTax.propTypes = {
    systemSettings: PropTypes.shape({
        currency: PropTypes.string.isRequired,
        vatRate: PropTypes.number.isRequired,
        defaultShippingFee: PropTypes.number.isRequired,
    }).isRequired,
    setSystemSettings: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    saveStatus: PropTypes.string,
};

export default CurrencyTax;
