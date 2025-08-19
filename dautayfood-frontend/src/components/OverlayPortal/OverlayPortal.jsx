import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const OverlayPortal = ({ children, onClickOutside }) => {
    const overlayRef = useRef(null);
    const modalRoot = document.getElementById('modal-root') || document.body;

    useEffect(() => {
        const handleClickOutside = (e) => {
            // nếu overlayRef chưa mount thì bỏ qua
            if (!overlayRef.current) return;
            // nếu click nằm ngoài node modal => đóng
            if (!overlayRef.current.contains(e.target)) {
                onClickOutside?.();
            }
        };

        // 'click' tốt hơn 'mousedown' cho trường hợp mở modal bằng click trên card
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [onClickOutside]);

    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex justify-center items-center p-4">
            {/* chặn event bubble nếu user click trong modal (phòng trường hợp con có onClick) */}
            <div ref={overlayRef} onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl max-w-[90vw] max-h-[95vh] overflow-auto">
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
