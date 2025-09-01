{/* Chế độ sáng/tối */ }
<div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <Palette className="mr-2 text-purple-500" />
        Chế độ hiển thị
    </h3>

    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
        <div className="flex items-center space-x-3">
            {darkMode ? <Moon className="text-purple-500" /> : <Sun className="text-yellow-500" />}
            <div>
                <h4 className="font-semibold text-gray-800">
                    {darkMode ? 'Chế độ tối' : 'Chế độ sáng'}
                </h4>
                <p className="text-sm text-gray-500">
                    {darkMode ? 'Giao diện tối, dễ nhìn trong môi trường thiếu sáng' : 'Giao diện sáng, rõ ràng và thân thiện'}
                </p>
            </div>
        </div>
        <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-16 h-8 rounded-full transition-colors ${darkMode ? 'bg-purple-500' : 'bg-gray-300'
                }`}
        >
            <div className={`w-7 h-7 bg-white rounded-full shadow-lg transition-transform flex items-center justify-center ${darkMode ? 'translate-x-8' : 'translate-x-0.5'
                }`}>
                {darkMode ? <Moon size={14} className="text-purple-500" /> : <Sun size={14} className="text-yellow-500" />}
            </div>
        </button>
    </div>

    <SaveButton
        onClick={() => handleSave('chế độ hiển thị')}
        className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700"
    >
        Lưu cài đặt
    </SaveButton>
</div>
