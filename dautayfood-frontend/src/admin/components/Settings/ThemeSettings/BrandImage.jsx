{/* Logo, Favicon, Banner */ }
<div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <Upload className="mr-2 text-blue-500" />
        Hình ảnh thương hiệu
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo */}
        <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">Logo Website</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                {themeSettings.logo ? (
                    <div className="space-y-2">
                        <img src={themeSettings.logo} alt="Logo" className="h-16 mx-auto" />
                        <button
                            onClick={() => setThemeSettings(prev => ({ ...prev, logo: null }))}
                            className="text-red-500 text-sm hover:underline"
                        >
                            Xóa logo
                        </button>
                    </div>
                ) : (
                    <div>
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 mb-2">Kéo thả hoặc click để tải logo</p>
                        <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
                            Chọn file
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (e) => setThemeSettings(prev => ({ ...prev, logo: e.target.result }));
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                className="hidden"
                            />
                        </label>
                    </div>
                )}
            </div>
            <p className="text-xs text-gray-400">Khuyến nghị: 200x60px, PNG/SVG</p>
        </div>

        {/* Favicon */}
        <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">Favicon</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                {themeSettings.favicon ? (
                    <div className="space-y-2">
                        <img src={themeSettings.favicon} alt="Favicon" className="h-8 w-8 mx-auto" />
                        <button
                            onClick={() => setThemeSettings(prev => ({ ...prev, favicon: null }))}
                            className="text-red-500 text-sm hover:underline"
                        >
                            Xóa favicon
                        </button>
                    </div>
                ) : (
                    <div>
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 mb-2">Tải favicon</p>
                        <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
                            Chọn file
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (e) => setThemeSettings(prev => ({ ...prev, favicon: e.target.result }));
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                className="hidden"
                            />
                        </label>
                    </div>
                )}
            </div>
            <p className="text-xs text-gray-400">Khuyến nghị: 32x32px, ICO/PNG</p>
        </div>

        {/* Banner */}
        <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">Banner Trang chủ</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                {themeSettings.banner ? (
                    <div className="space-y-2">
                        <img src={themeSettings.banner} alt="Banner" className="h-12 w-full object-cover rounded mx-auto" />
                        <button
                            onClick={() => setThemeSettings(prev => ({ ...prev, banner: null }))}
                            className="text-red-500 text-sm hover:underline"
                        >
                            Xóa banner
                        </button>
                    </div>
                ) : (
                    <div>
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 mb-2">Tải banner</p>
                        <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
                            Chọn file
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (e) => setThemeSettings(prev => ({ ...prev, banner: e.target.result }));
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                className="hidden"
                            />
                        </label>
                    </div>
                )}
            </div>
            <p className="text-xs text-gray-400">Khuyến nghị: 1200x400px, JPG/PNG</p>
        </div>
    </div>

    <SaveButton
        onClick={() => handleSave('hình ảnh thương hiệu')}
        className="mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
    >
        Lưu thay đổi
    </SaveButton>
</div>