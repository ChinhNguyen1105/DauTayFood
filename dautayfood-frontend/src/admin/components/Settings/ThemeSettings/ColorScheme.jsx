{/* Màu sắc chủ đạo */ }
<div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <Palette className="mr-2 text-pink-500" />
        Màu sắc thương hiệu
    </h3>

    <div className="space-y-6">
        <div className="flex items-center space-x-4">
            <label className="block text-sm font-semibold text-gray-700 w-32">Màu chủ đạo:</label>
            <div className="flex items-center space-x-3">
                <input
                    type="color"
                    value={themeSettings.primaryColor}
                    onChange={(e) => setThemeSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                    className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                />
                <input
                    type="text"
                    value={themeSettings.primaryColor}
                    onChange={(e) => setThemeSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm w-24"
                />
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
                { name: 'Blue', color: '#3B82F6' },
                { name: 'Green', color: '#10B981' },
                { name: 'Purple', color: '#8B5CF6' },
                { name: 'Pink', color: '#EC4899' },
                { name: 'Red', color: '#EF4444' },
                { name: 'Orange', color: '#F97316' },
                { name: 'Yellow', color: '#EAB308' },
                { name: 'Indigo', color: '#6366F1' }
            ].map((preset) => (
                <button
                    key={preset.name}
                    onClick={() => setThemeSettings(prev => ({ ...prev, primaryColor: preset.color }))}
                    className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all hover:scale-105 ${themeSettings.primaryColor === preset.color
                        ? 'border-gray-800 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                >
                    <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: preset.color }}
                    />
                    <span className="text-sm font-medium">{preset.name}</span>
                </button>
            ))}
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Xem trước:</h4>
            <div className="space-y-3">
                <button
                    className="px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: themeSettings.primaryColor }}
                >
                    Nút chính
                </button>
                <div className="flex space-x-2">
                    <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: themeSettings.primaryColor }}
                    />
                    <div
                        className="w-4 h-4 rounded opacity-75"
                        style={{ backgroundColor: themeSettings.primaryColor }}
                    />
                    <div
                        className="w-4 h-4 rounded opacity-50"
                        style={{ backgroundColor: themeSettings.primaryColor }}
                    />
                </div>
            </div>
        </div>
    </div>

    <SaveButton
        onClick={() => handleSave('màu sắc thương hiệu')}
        className="mt-6 text-white transition-all duration-200"
        style={{
            background: `linear-gradient(45deg, ${themeSettings.primaryColor}, ${themeSettings.primaryColor}dd)`
        }}
    >
        Áp dụng màu sắc
    </SaveButton>
</div>