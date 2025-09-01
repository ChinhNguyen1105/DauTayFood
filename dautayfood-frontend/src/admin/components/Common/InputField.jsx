import { AlertTriangle } from "lucide-react";
const InputField = ({ label, type = 'text', value, onChange, placeholder, icon: Icon, error, ...props }) => (
    <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">{label}</label>
        <div className="relative">
            {Icon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className="h-5 w-5 text-gray-400" />
                </div>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${Icon ? 'pl-10' : ''
                    } ${error ? 'border-red-500' : 'border-gray-300'}`}
                {...props}
            />
        </div>
        {error && <p className="text-sm text-red-500 flex items-center"><AlertTriangle size={16} className="mr-1" />{error}</p>}
    </div>
);
export default InputField;