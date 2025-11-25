import { useState } from "react";

export default function ImageMapPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    const handleAreaClick = () => {
        setIsOpen(true);
    };

    return (
        <div>
            <img
                src="/WhatsApp%20Image%202025-11-24%20at%2016.55.27.jpeg"
                alt="Image Map"
                useMap="#WhatsAppImage2025-11-24at14.34.49.jpeg"
                className="max-w-none"
            />
            {isTooltipOpen && (
                <div className="absolute top-52 left-80 bg-gray-800 text-white p-2 rounded shadow-lg z-10">
                    Tooltip for the area
                </div>
            )}
            <map name="WhatsAppImage2025-11-24at14.34.49.jpeg" id="WhatsAppImage2025-11-24at14.34.49.jpeg">
                <area
                    shape="poly"
                    coords="360,214,388,321,471,310,404,196,360,214"
                    onClick={handleAreaClick}
                    onFocus={handleAreaClick}
                    onMouseEnter={() => setIsTooltipOpen(true)}
                    onMouseLeave={() => setIsTooltipOpen(false)}
                    alt=""
                />
            </map>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setIsOpen(false)}>
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-lg font-semibold mb-4">Area Clicked</h2>
                        <p className="mb-4">Area clicked! This is a custom dialog.</p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => setIsOpen(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}