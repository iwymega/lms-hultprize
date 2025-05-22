import React, { useState, useEffect } from "react";

interface DebouncedSearchInputProps {
    value?: string;
    onChange: (value: string) => void;
    debounceTime?: number; // ms
    className?: string;
    inputClassName?: string;
    icon?: React.ReactNode;
    placeholder?: string;
}

const DebouncedSearchInput: React.FC<DebouncedSearchInputProps> = ({
    value = "",
    onChange,
    debounceTime = 300,
    className = "",
    inputClassName = "",
    icon,
    placeholder = "Search",
}) => {
    const [inputValue, setInputValue] = useState(value);

    // Debounce logic
    useEffect(() => {
        const handler = setTimeout(() => {
            if (inputValue !== value) {
                onChange(inputValue);
            }
        }, debounceTime);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, debounceTime, onChange, value]);

    // Sync internal state if parent value changes externally
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    return (
        <div className={`relative max-w-sm ${className}`}>
            {icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    {icon}
                </div>
            )}
            <input
                type="text"
                placeholder={placeholder}
                className={`pl-10 w-full border rounded-md py-2 px-3 ${inputClassName}`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
        </div>
    );
};

export default DebouncedSearchInput;
