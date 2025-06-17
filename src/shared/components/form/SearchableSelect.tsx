import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SelectOption = {
    label: string;
    value: string;
};

interface SearchableSelectProps {
    options: SelectOption[];
    value?: string | string[];
    placeholder?: string;
    onChange: (value: string | string[]) => void;
    isMulti?: boolean;
    className?: string;
    disabled?: boolean;
    searchValue?: string;
    onSearchChange?: (search: string) => void;
    serverSideSearch?: boolean;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
    options,
    value,
    placeholder = "Select...",
    onChange,
    isMulti = false,
    className,
    disabled = false,
    searchValue,
    onSearchChange,
    serverSideSearch = false,
}) => {
    const [open, setOpen] = React.useState(false);

    const isSelected = (val: string) => {
        if (isMulti && Array.isArray(value)) {
            return value.includes(val);
        }
        return value === val;
    };

    const handleSelect = (val: string) => {
        if (isMulti) {
            const current = Array.isArray(value) ? value : [];
            const isAlreadySelected = current.includes(val); // Menggunakan variabel yang lebih deskriptif

            const newValues = isAlreadySelected
                ? current.filter((v) => v !== val)
                : [...current, val];
            onChange(newValues);
        } else {
            onChange(val);
            setOpen(false);
        }
    };

    const displayValue = () => {
        if (isMulti && Array.isArray(value) && value.length > 0) {
            if (value.length > 2) {
                return `${value.length} items selected`;
            }
            return options
                .filter((opt) => value.includes(opt.value))
                .map((opt) => opt.label)
                .join(", ");
        } else if (!isMulti) {
            const selected = options.find((opt) => opt.value === value);
            return selected?.label || "";
        }
        return "";
    };

    return (
        <div className={cn("w-full", className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        disabled={disabled}
                        aria-expanded={open}
                        className={cn(
                            "w-full h-10 justify-between font-normal", // Menghapus style hardcode dan menggunakan font-normal
                            !displayValue() && "text-muted-foreground" // Gaya placeholder jika tidak ada nilai
                        )}
                    >
                        {displayValue() || placeholder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                    <Command
                        filter={serverSideSearch ? () => 1 : undefined}
                    >
                        <CommandInput
                            placeholder="Search..."
                            className="h-9"
                            value={searchValue}
                            onValueChange={onSearchChange}
                        />
                        <CommandEmpty>No options found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.label}
                                    onSelect={() => handleSelect(option.value)}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            isSelected(option.value)
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default SearchableSelect;