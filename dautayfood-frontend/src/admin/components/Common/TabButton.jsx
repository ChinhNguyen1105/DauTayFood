import PropTypes from "prop-types";

const TabButton = ({ id, label, icon: Icon, active, onClick }) => {
    return (
        <button
            key={id}
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 ${active
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:scale-105"
                }`}
        >
            {Icon && <Icon size={20} />}
            <span className="font-medium">{label}</span>
        </button>
    );
};

TabButton.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.elementType, // component icon (ví dụ Shield, User...)
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

TabButton.defaultProps = {
    active: false,
    icon: null,
};

export default TabButton;
