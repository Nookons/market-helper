import React, { useState, useRef, useEffect } from 'react';

export interface ISelectOption {
    value: string;
    label: string;
}

interface MySelectProps {
    options: ISelectOption[];
    label?: string;
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const MySelect: React.FC<MySelectProps> = ({
                                               options,
                                               label,
                                               value,
                                               onChange,
                                               placeholder = 'Select...',
                                               className = '',
                                           }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    // Закрытие селекта при клике вне компонента
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (selectedValue: string) => {
        onChange(selectedValue);
        setIsOpen(false);
    };

    const selectedOption = options.find(option => option.value === value);

    return (
        <div ref={selectRef} className={`relative w-full ${className}`}>
            {label && <label className="text-sm font-medium dark:text-gray-200 text-gray-700">{label}</label>}
            <div className="flex items-center justify-between p-3 dark:bg-neutral-800 bg-neutral-200 rounded-t-2xl rounded-b  cursor-pointer  transition-colors" onClick={() => setIsOpen(!isOpen)}>
                <span className={`${value ? 'text-gray-800 dark:text-white' : 'text-gray-400'}`}>
                  {selectedOption?.label || placeholder}
                </span>
                <svg
                    className={`w-5 h-5 dark:text-white text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 overflow-hidden dark:bg-neutral-800 bg-neutral-200 rounded-t rounded-b-2xl shadow-lg top-full">
                    <ul>
                        {options.map((option) => (
                            <li
                                key={option.value}
                                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                                    option.value === value ? 'bg-orange-500' : ''
                                }`}
                                onClick={() => handleSelect(option.value)}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MySelect;