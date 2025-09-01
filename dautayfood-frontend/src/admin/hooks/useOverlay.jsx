// src/hooks/useOverlay.js
import { useState, useCallback } from "react";

export default function useOverlay() {
    const [isOpen, setIsOpen] = useState(false);
    const [overlayType, setOverlayType] = useState(null); // 'detail' | 'edit' | 'delete'
    const [overlayData, setOverlayData] = useState(null);

    const openOverlay = useCallback((type, data = null) => {
        setOverlayType(type);
        setOverlayData(data);
        setIsOpen(true);
    }, []);

    const closeOverlay = useCallback(() => {
        setIsOpen(false);
        setOverlayType(null);
        setOverlayData(null);
    }, []);

    return { isOpen, overlayType, overlayData, openOverlay, closeOverlay };
}
