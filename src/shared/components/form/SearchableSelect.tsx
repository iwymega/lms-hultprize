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
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
    options,
    value,
    placeholder = "Select...",
    onChange,
    isMulti = false,
    className,
    disabled = false,
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
            const exists = current.includes(val);
            const newValues = exists
                ? current.filter((v) => v !== val)
                : [...current, val];
            onChange(newValues);
        } else {
            onChange(val);
            setOpen(false);
        }
    };

    const displayValue = () => {
        if (isMulti && Array.isArray(value)) {
            return options
                .filter((opt) => value.includes(opt.value))
                .map((opt) => opt.label)
                .join(", ");
        } else {
            const selected = options.find((opt) => opt.value === value);
            return selected?.label || "";
        }
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
                            "w-full h-10 justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                    >
                        {displayValue() || (
                            <span className="text-muted-foreground">{placeholder}</span>
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                    <Command>
                        <CommandInput placeholder="Search..." className="h-9" />
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