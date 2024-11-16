import {useEffect, useMemo, useRef, useState} from 'react';
import useOutsideClick from "@/hooks/useOutsideClick";
import {cn} from "@/lib/utils";
import {ChevronDown} from "lucide-react";

interface DropdownItem {
    // id?: string;
    label: string;
    value: string;
}

interface DropdownProps {
    id?: string;
    title?: string;
    data: DropdownItem[];
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    hasImage?: boolean;
    style?: string;
    value?: string;
    onSelect?: (id: string) => void;
    className?: string;
    dropdownContainer?: {
        className?: string;
    }
}

const NavDropdown = ({
                         id,
                         title = 'Select',
                         data,
                         position = 'bottom-left',
                         style,
                         value,
                         onSelect,
                         className,
                         dropdownContainer,
                     }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
        value ? data?.find((item) => item.value === value) : undefined
    );

    const handleChange = (item: DropdownItem) => {
        setSelectedItem(item);
        onSelect && onSelect(item.value);
        setIsOpen(false);
    };

    useEffect(() => {
        if (value && data) {
            const newSelectedItem = data.find((item) => item.value === value);
            newSelectedItem && setSelectedItem(newSelectedItem);
        } else {
            setSelectedItem(undefined);
        }
    }, [value, data]);

    const dropdownRef = useRef<HTMLDivElement>(null);
    useOutsideClick({
        ref: dropdownRef,
        handler: () => setIsOpen(false),
    });

    const dropdownClass = useMemo(() => {
        return cn(
            'absolute bg-gray-50 w-max max-h-52 overflow-y-auto rounded shadow-md z-10',
            {
                'top-full right-0 mt-2': position === 'bottom-right',
                'top-full left-0 mt-2': position === 'bottom-left',
                'bottom-full right-0 mb-2': position === 'top-right',
                'bottom-full left-0 mb-2': position === 'top-left',
            },
            dropdownContainer?.className,
        );
    }, [dropdownContainer])

    return (
        <div ref={dropdownRef} className={cn("relative", className)}>
            <button
                id={id}
                aria-label='Toggle dropdown'
                aria-haspopup='true'
                aria-expanded={isOpen}
                type='button'
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    'flex justify-between items-center gap-5 rounded w-full py-2 px-4 bg-transparent text-white',
                    style
                )}
            >
                <span
                    className={"font-futurapt text-gray-600 font-semibold text-[14px] uppercase flex"}>{selectedItem?.label || title}</span>
                <ChevronDown
                    size={20}
                    className={cn('transform duration-500 ease-in-out', {
                        'rotate-180': isOpen,
                    })}
                />
            </button>
            {/* Open */}
            {isOpen && (
                <div aria-label='Dropdown menu' className={dropdownClass}>
                    <ul
                        role='menu'
                        aria-labelledby={id}
                        aria-orientation='vertical'
                        className='leading-10'
                    >
                        {data?.map((item) => (
                            <li
                                key={item.value}
                                onClick={() => handleChange(item)}
                                className={cn(
                                    'flex items-center cursor-pointer bg-gray-300 hover:bg-gray-50 px-3',
                                    {'bg-gray-50': selectedItem?.value === item.value}
                                )}
                            >
                                <span
                                    className={"font-futurapt text-gray-600 font-semibold text-[14px] uppercase flex"}>{item.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NavDropdown;