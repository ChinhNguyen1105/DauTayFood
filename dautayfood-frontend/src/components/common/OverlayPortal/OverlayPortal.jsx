import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const OverlayPortal = ({ children, onClickOutside }) => {
    const overlayRef = useRef(null);
    const modalRoot = document.getElementById("modal-root") || document.body;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Hiển thị với hiệu ứng fade-in
        setVisible(true);

        const handleClickOutside = (e) => {
            if (!overlayRef.current) return;
            if (!overlayRef.current.contains(e.target)) {
                handleClose();
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleClose = () => {
        // Tắt hiệu ứng trước khi unmount
        setVisible(false);
        setTimeout(() => {
            onClickOutside?.();
        }, 300); // thời gian trùng với transition
    };

    return createPortal(
        <div
            className={`fixed inset-0 z-[9999] flex justify-center items-center p-4 bg-black/50 
      transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"
                }`}
        >
            <div
                ref={overlayRef}
                className={`bg-white dark:bg-gray-800 dark:text-gray-100 rounded-xl max-w-[90vw] max-h-[95vh] overflow-auto transform transition-all duration-300 
        ${visible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        modalRoot
    );
};

OverlayPortal.propTypes = {
    children: PropTypes.node.isRequired,
    onClickOutside: PropTypes.func,
};

export default OverlayPortal;
