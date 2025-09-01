import PropTypes from "prop-types";
import { RefreshCw, CheckCircle, Save, XCircle } from "lucide-react";

const SaveButton = ({
    onClick,
    className = "",
    children = "Lưu",
    loading = false,
    success = false,
    error = false,
    disabled = false,
}) => {
    const isDisabled = loading || disabled;

    let icon = <Save size={18} />;
    let label = children;

    if (loading) {
        icon = <RefreshCw size={18} className="animate-spin" />;
        label = "Đang lưu...";
    } else if (success) {
        icon = <CheckCircle size={18} />;
        label = "Đã lưu!";
    } else if (error) {
        icon = <XCircle size={18} />;
        label = "Lỗi!";
    }

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 ${className}`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
};

SaveButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
    loading: PropTypes.bool,
    success: PropTypes.bool,
    error: PropTypes.bool,
    disabled: PropTypes.bool,
};

SaveButton.defaultProps = {
    className: "",
    children: "Lưu",
    loading: false,
    success: false,
    error: false,
    disabled: false,
};

export default SaveButton;
