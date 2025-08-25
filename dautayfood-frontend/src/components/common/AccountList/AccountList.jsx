import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import PayByBanking from "../PayByBanking/PayByBanking";
import mbbank from "../../assets/mbbank.jpg";
import Techcombank from "../../assets/techcombank.webp";
import Tpbank from "../../assets/tpbank.png";

const logoMap = {
    Vietcombank: mbbank,
    TPBank: Tpbank,
    Techcombank: Techcombank,
    MBBank: mbbank,
    BIDV: mbbank,
    Agribank: mbbank,
    VietinBank: mbbank,
    ACB: mbbank,
    Sacombank: mbbank,
};

const SavedBankAccounts = ({ onSelect, onEdit, onClose }) => {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccountIndex, setSelectedAccountIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showBankingForm, setShowBankingForm] = useState(false);
    const [accountToEdit, setAccountToEdit] = useState(null);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("bankAccounts")) || [];
        setAccounts(stored);
        setIsLoading(false);
    }, []);

    const handleDelete = (index, event) => {
        event.stopPropagation();
        if (!window.confirm("Bạn có chắc muốn xóa tài khoản này?")) return;

        const updated = [...accounts];
        updated.splice(index, 1);
        setAccounts(updated);
        localStorage.setItem("bankAccounts", JSON.stringify(updated));

        if (selectedAccountIndex === index) {
            setSelectedAccountIndex(null);
        } else if (selectedAccountIndex > index) {
            setSelectedAccountIndex(selectedAccountIndex - 1);
        }
    };

    const handleEdit = (index, event) => {
        event.stopPropagation();
        const editingAccount = { ...accounts[index], index };
        setAccountToEdit(editingAccount);
        setShowBankingForm(true);
    };

    const handleSelect = (index) => {
        setSelectedAccountIndex(index);
    };

    const handleConfirmSelection = () => {
        if (selectedAccountIndex !== null && onSelect) {
            onSelect(accounts[selectedAccountIndex]);
        }
        if (onClose) onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) return;
            }}
        >
            <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-xl relative animate-[slideUp_0.3s_ease-out]">
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                    >
                        ×
                    </button>
                )}

                <h5 className="text-lg font-semibold text-gray-900 text-center py-6 border-b border-gray-100">
                    Chọn tài khoản ngân hàng đã lưu
                </h5>

                {isLoading ? (
                    <div className="text-center text-gray-500 py-6">Đang tải...</div>
                ) : accounts.length === 0 ? (
                    <p className="text-center text-gray-500 py-6">
                        Chưa có tài khoản nào được lưu.
                    </p>
                ) : (
                    <div className="px-4 py-4 space-y-3">
                        {accounts.map((acc, index) => (
                            <label
                                key={index}
                                className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all relative bg-white ${selectedAccountIndex === index
                                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                                    : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                                    }`}
                                onClick={() => handleSelect(index)}
                            >
                                <input
                                    type="radio"
                                    name="bankAccount"
                                    checked={selectedAccountIndex === index}
                                    onChange={() => handleSelect(index)}
                                    className="absolute opacity-0"
                                />
                                <div className="w-5 h-5 border-2 border-gray-300 rounded-full mr-3 flex-shrink-0 flex items-center justify-center">
                                    {selectedAccountIndex === index && (
                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    )}
                                </div>
                                <img
                                    src={logoMap[acc.bank] || mbbank}
                                    alt={acc.bank}
                                    className="w-12 h-8 rounded-md object-contain mr-3 flex-shrink-0"
                                    onError={(e) => {
                                        e.target.src = mbbank;
                                    }}
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 truncate">
                                        {acc.accountName}
                                    </p>
                                    <p className="text-sm text-gray-600 truncate">
                                        {acc.bank} - ****{acc.accountNumber.slice(-4)}
                                    </p>
                                </div>
                                <div className="flex gap-2 ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <FaEdit
                                        onClick={(e) => handleEdit(index, e)}
                                        className="w-6 h-6 text-gray-500 hover:text-blue-600 cursor-pointer p-1 rounded hover:bg-gray-100"
                                    />
                                    <FaTrash
                                        onClick={(e) => handleDelete(index, e)}
                                        className="w-6 h-6 text-gray-500 hover:text-red-600 cursor-pointer p-1 rounded hover:bg-red-50"
                                    />
                                </div>
                            </label>
                        ))}
                    </div>
                )}

                <div className="flex justify-between gap-3 px-4 py-4 border-t border-gray-100">
                    <button
                        onClick={() => {
                            setAccountToEdit(null);
                            setShowBankingForm(true);
                        }}
                        className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl flex-1 transition"
                    >
                        + Thêm tài khoản mới
                    </button>
                    <button
                        disabled={selectedAccountIndex === null}
                        onClick={handleConfirmSelection}
                        className={`px-4 py-3 font-medium rounded-xl flex-1 transition ${selectedAccountIndex === null
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 text-white"
                            }`}
                    >
                        Xác nhận
                    </button>
                </div>

                {showBankingForm && (
                    <PayByBanking
                        initialData={accountToEdit}
                        onBankingInfoChange={(info) => {
                            const updated = [...accounts];
                            if (accountToEdit && accountToEdit.index !== undefined) {
                                updated[accountToEdit.index] = info;
                            } else {
                                updated.push(info);
                            }
                            setAccounts(updated);
                            localStorage.setItem("bankAccounts", JSON.stringify(updated));
                            setShowBankingForm(false);
                            setAccountToEdit(null);
                        }}
                        onClose={() => {
                            setShowBankingForm(false);
                            setAccountToEdit(null);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default SavedBankAccounts;
