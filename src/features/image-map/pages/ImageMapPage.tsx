import { useState } from "react";

export default function ImageMapPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const [tooltipContent, setTooltipContent] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

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
                <div className="absolute bg-gray-800 text-white p-2 rounded shadow-lg z-10" style={{ top: tooltipPosition.top, left: tooltipPosition.left }}>
                    {tooltipContent}
                </div>
            )}
            <map name="WhatsAppImage2025-11-24at14.34.49.jpeg" id="WhatsAppImage2025-11-24at14.34.49.jpeg">
                <area
                    shape="poly"
                    coords="543,140,620,140,620,194,543,194,543,140"
                    onClick={handleAreaClick}
                    onMouseEnter={() => { setIsTooltipOpen(true); setTooltipContent('Tooltip for area 1'); setTooltipPosition({ top: 167, left: 581 }); }}
                    onMouseLeave={() => setIsTooltipOpen(false)}
                    alt=""
                />
                <area
                    shape="poly"
                    coords="428,201,498,201,498,258,428,258,428,201"
                    onClick={handleAreaClick}
                    onMouseEnter={() => { setIsTooltipOpen(true); setTooltipContent('Tooltip for area 2'); setTooltipPosition({ top: 230, left: 463 }); }}
                    onMouseLeave={() => setIsTooltipOpen(false)}
                    alt=""
                />
                <area
                    shape="poly"
                    coords="349,218,426,218,426,306,349,306,349,218"
                    onClick={handleAreaClick}
                    onMouseEnter={() => { setIsTooltipOpen(true); setTooltipContent('Tooltip for area 3'); setTooltipPosition({ top: 262, left: 388 }); }}
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