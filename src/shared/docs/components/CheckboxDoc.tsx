import { CheckboxAllToggle } from "@/shared/components/form/CheckboxAllToggle";
import { CheckboxItemList } from "@/shared/components/form/CheckboxItemList";
import { useCheckboxSelectSingleRow } from "@/shared/hooks/useCheckboxSelectSingleRow";
import { PreviewBlock } from "./PreviewBlock";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useCheckboxSelectCrossRow } from "@/shared/hooks/useCheckboxSelectCrossRow";
import { Button } from "@/components/ui/button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Item = {
    id: string;
    name: string;
};

const items: Item[] = [
    { id: "apple", name: "Apple" },
    { id: "banana", name: "Banana" },
    { id: "cherry", name: "Cherry" },
    { id: "date", name: "Date" },
];

function ExampleCheckboxWithAllToggle() {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    const toggleItem = (key: string) => {
        setSelectedKeys((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    };

    const allSelected = selectedKeys.length === items.length;

    const toggleAll = () => {
        if (allSelected) {
            setSelectedKeys([]);
        } else {
            setSelectedKeys(items.map((item) => item.id));
        }
    };

    const preview = (
        <div className="p-6 max-w-md mx-auto space-y-4">
            <CheckboxAllToggle
                allSelected={allSelected}
                toggleAll={toggleAll}
                label="Select All Fruits"
            />

            <CheckboxItemList<Item>
                data={items}
                selectedKeys={selectedKeys}
                toggleItem={toggleItem}
                keySelector={(item) => item.id}
                labelSelector={(item) => item.name}
            />

            <div className="mt-4 text-sm text-gray-600">
                Selected: {selectedKeys.join(", ") || "None"}
            </div>
        </div>
    )

    const code = `
        type Item = {
            id: string;
            name: string;
        };

        const items: Item[] = [
            { id: "apple", name: "Apple" },
            { id: "banana", name: "Banana" },
            { id: "cherry", name: "Cherry" },
            { id: "date", name: "Date" },
        ];

        function CheckboxWithAllToggle() {
            const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

            const toggleItem = (key: string) => {
                setSelectedKeys((prev) =>
                    prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
                );
            };

            const allSelected = selectedKeys.length === items.length;

            const toggleAll = () => {
                if (allSelected) {
                    setSelectedKeys([]);
                } else {
                    setSelectedKeys(items.map((item) => item.id));
                }
            };

            return (
                <div className="p-6 max-w-md mx-auto space-y-4">
                    <CheckboxAllToggle
                        allSelected={allSelected}
                        toggleAll={toggleAll}
                        label="Select All Fruits"
                    />

                    <CheckboxItemList<Item>
                        data={items}
                        selectedKeys={selectedKeys}
                        toggleItem={toggleItem}
                        keySelector={(item) => item.id}
                        labelSelector={(item) => item.name}
                    />

                    <div className="mt-4 text-sm text-gray-600">
                        Selected: {selectedKeys.join(", ") || "None"}
                    </div>
                </div>
            )
        }
    `;

    return { preview, code };
}

function CheckboxItemListExample() {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const toggleItem = (key: string) => {
        setSelectedKeys((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    }

    const preview = (
        <div className="p-6 max-w-md mx-auto space-y-4">
            <CheckboxItemList<Item>
                data={items}
                selectedKeys={selectedKeys}
                toggleItem={toggleItem}
                keySelector={(item) => item.id}
                labelSelector={(item) => item.name}
            />
            <div className="mt-4 text-sm text-gray-600">
                Selected: {selectedKeys.join(", ") || "None"}
            </div>
        </div>
    );

    const code = `
        type Item = {
            id: string;
            name: string;
        };

        const items: Item[] = [
            { id: "apple", name: "Apple" },
            { id: "banana", name: "Banana" },
            { id: "cherry", name: "Cherry" },
            { id: "date", name: "Date" },
        ];

        function CheckboxItemListExample() {
            const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
            const toggleItem = (key: string) => {
                setSelectedKeys((prev) =>
                    prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
                );
            }

            return (
                <div className="p-6 max-w-md mx-auto space-y-4">
                    <CheckboxItemList<Item>
                        data={items}
                        selectedKeys={selectedKeys}
                        toggleItem={toggleItem}
                        keySelector={(item) => item.id}
                        labelSelector={(item) => item.name}
                    />
                    <div className="mt-4 text-sm text-gray-600">
                        Selected: {selectedKeys.join(", ") || "None"}
                    </div>
                </div>
            )
        }
    `;

    return { code, preview };
}

function CheckboxItemListExampleWithRender() {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const toggleItem = (key: string) => {
        setSelectedKeys((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    }
    const preview = (
        <div className="p-6 max-w-md mx-auto space-y-4">
            <CheckboxItemList<Item>
                data={items}
                selectedKeys={selectedKeys}
                toggleItem={toggleItem}
                keySelector={(item) => item.id}
                labelSelector={(item) => item.name}
                renderItem={(item, { key, checked, toggle }) => (
                    <div key={key} className="flex items-center gap-2 mb-2">
                        <Checkbox
                            id={`checkbox-${key}`}
                            checked={checked}
                            onCheckedChange={toggle}
                            className="data-[state=checked]:bg-blue-500 data-[state=checked]:text-white data-[state=checked]:border-blue-500 data-[state=unchecked]:border-gray-300 data-[state=unchecked]:bg-white data-[state=unchecked]:text-gray-700"
                        />
                        <label htmlFor={`checkbox-${key}`} className="text-sm">
                            {item.name}
                        </label>
                    </div>
                )}
            />
            <div className="mt-4 text-sm text-gray-600">
                Selected: {selectedKeys.join(", ") || "None"}
            </div>
        </div>
    );
    const code = `
        import React, { useState } from "react";
        import { Checkbox } from "@/components/ui/checkbox";

        type Item = {
        id: string;
        name: string;
        };

        const items: Item[] = [
        { id: "apple", name: "Apple" },
        { id: "banana", name: "Banana" },
        { id: "cherry", name: "Cherry" },
        { id: "date", name: "Date" },
        ];

        function CheckboxItemListExampleWithRender() {
        const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

        const toggleItem = (key: string) => {
            setSelectedKeys((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
            );
        };

        return (
            <div className="p-6 max-w-md mx-auto space-y-4">
            <CheckboxItemList<Item>
                data={items}
                selectedKeys={selectedKeys}
                toggleItem={toggleItem}
                keySelector={(item) => item.id}
                labelSelector={(item) => item.name}
                renderItem={(item, { key, checked, toggle }) => (
                <div key={key} className="flex items-center gap-2 mb-2">
                    <Checkbox
                    id={\`checkbox-\${key}\`}
                    checked={checked}
                    onCheckedChange={toggle}
                    className="data-[state=checked]:bg-blue-500 data-[state=checked]:text-white data-[state=checked]:border-blue-500 data-[state=unchecked]:border-gray-300 data-[state=unchecked]:bg-white data-[state=unchecked]:text-gray-700"
                    />
                    <label htmlFor={\`checkbox-\${key}\`} className="text-sm">
                    {item.name}
                    </label>
                </div>
                )}
            />
            <div className="mt-4 text-sm text-gray-600">
                Selected: {selectedKeys.join(", ") || "None"}
            </div>
            </div>
        );
        }
        `;

    return { code: code, preview: preview };
}

function CheckboxAllToggleWithItemListAndHookSingleRow() {
    const {
        selectedKeys,
        toggleAll,
        toggleItem,
        allSelected,
    } = useCheckboxSelectSingleRow(items, (item) => item.id);

    const preview = (
        <div className="p-6 max-w-md mx-auto space-y-4">
            <CheckboxAllToggle allSelected={allSelected} toggleAll={toggleAll} label="Pilih Semua" />
            <CheckboxItemList<Item>
                data={items}
                selectedKeys={selectedKeys}
                toggleItem={toggleItem}
                keySelector={(item) => item.id}
                labelSelector={(item) => item.name}
            />
            <div className="mt-4 text-sm text-gray-600">
                Selected: {selectedKeys.join(", ") || "None"}
            </div>
        </div>
    )

    const code = `
        type Item = {
            id: string;
            name: string;
        };

        const items: Item[] = [
            { id: "apple", name: "Apple" },
            { id: "banana", name: "Banana" },
            { id: "cherry", name: "Cherry" },
            { id: "date", name: "Date" },
        ];

        function CheckboxAllToggleWithItemListAndHookSingleRow() {
            const {
                selectedKeys,
                toggleAll,
                toggleItem,
                allSelected,
            } = useCheckboxSelectSingleRow(items, (item) => item.id);
            return (
                <div className="p-6 max-w-md mx-auto space-y-4">
                    <CheckboxAllToggle allSelected={allSelected} toggleAll={toggleAll} label="Pilih Semua" />
                    <CheckboxItemList<Item>
                        data={items}
                        selectedKeys={selectedKeys}
                        toggleItem={toggleItem}
                        keySelector={(item) => item.id}
                        labelSelector={(item) => item.name}
                    />
                    <div className="mt-4 text-sm text-gray-600">
                        Selected: {selectedKeys.join(", ") || "None"}
                    </div>
                </div>
            )
        }
    `;

    return { code, preview };
}

const fruits: Item[] = [
    { id: "apple", name: "Apple" },
    { id: "banana", name: "Banana" },
    { id: "cherry", name: "Cherry" },
];

const vegetables: Item[] = [
    { id: "carrot", name: "Carrot" },
    { id: "lettuce", name: "Lettuce" },
    { id: "spinach", name: "Spinach" },
];

function CheckboxCrossRowMultiExample() {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    // Hook untuk baris buah
    const fruitsSelection = useCheckboxSelectCrossRow(
        selectedKeys,
        fruits.map((item) => item.id)
    );

    // Hook untuk baris sayur
    const vegetablesSelection = useCheckboxSelectCrossRow(
        selectedKeys,
        vegetables.map((item) => item.id)
    );

    // Toggle semua item di baris buah
    const toggleAllFruits = () => {
        const newSelected = fruitsSelection.toggleAll();
        setSelectedKeys(newSelected);
    };

    // Toggle semua item di baris sayur
    const toggleAllVegetables = () => {
        const newSelected = vegetablesSelection.toggleAll();
        setSelectedKeys(newSelected);
    };

    // Toggle item per buah
    const toggleFruitItem = (key: string) => {
        const newSelected = fruitsSelection.toggleItem(key);
        setSelectedKeys(newSelected);
    };

    // Toggle item per sayur
    const toggleVegetableItem = (key: string) => {
        const newSelected = vegetablesSelection.toggleItem(key);
        setSelectedKeys(newSelected);
    };

    const preview = (
        <div className="p-6 max-w-md mx-auto space-y-8">
            <div>
                <h3 className="mb-2 font-semibold text-lg">Buah-buahan</h3>
                <CheckboxAllToggle
                    allSelected={fruitsSelection.allSelected}
                    toggleAll={toggleAllFruits}
                    label="Pilih Semua Buah"
                />
                <CheckboxItemList<Item>
                    data={fruits}
                    selectedKeys={selectedKeys}
                    toggleItem={toggleFruitItem}
                    keySelector={(item) => item.id}
                    labelSelector={(item) => item.name}
                />
            </div>

            <div>
                <h3 className="mb-2 font-semibold text-lg">Sayuran</h3>
                <CheckboxAllToggle
                    allSelected={vegetablesSelection.allSelected}
                    toggleAll={toggleAllVegetables}
                    label="Pilih Semua Sayur"
                />
                <CheckboxItemList<Item>
                    data={vegetables}
                    selectedKeys={selectedKeys}
                    toggleItem={toggleVegetableItem}
                    keySelector={(item) => item.id}
                    labelSelector={(item) => item.name}
                />
            </div>

            <div className="mt-4 text-sm text-gray-600">
                Dipilih: {selectedKeys.length > 0 ? selectedKeys.join(", ") : "Tidak ada"}
            </div>
        </div>
    );

    const code = `
        type Item = {
            id: string;
            name: string;
        };

        const fruits: Item[] = [
            { id: "apple", name: "Apple" },
            { id: "banana", name: "Banana" },
            { id: "cherry", name: "Cherry" },
        ];

        const vegetables: Item[] = [
            { id: "carrot", name: "Carrot" },
            { id: "lettuce", name: "Lettuce" },
            { id: "spinach", name: "Spinach" },
        ];

        const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

        // Hook untuk baris buah
        const fruitsSelection = useCheckboxSelectCrossRow(
            selectedKeys,
            fruits.map((item) => item.id)
        );

        // Hook untuk baris sayur
        const vegetablesSelection = useCheckboxSelectCrossRow(
            selectedKeys,
            vegetables.map((item) => item.id)
        );

        // Toggle semua item di baris buah
        const toggleAllFruits = () => {
            const newSelected = fruitsSelection.toggleAll();
            setSelectedKeys(newSelected);
        };

        // Toggle semua item di baris sayur
        const toggleAllVegetables = () => {
            const newSelected = vegetablesSelection.toggleAll();
            setSelectedKeys(newSelected);
        };

        // Toggle item per buah
        const toggleFruitItem = (key: string) => {
            const newSelected = fruitsSelection.toggleItem(key);
            setSelectedKeys(newSelected);
        };

        // Toggle item per sayur
        const toggleVegetableItem = (key: string) => {
            const newSelected = vegetablesSelection.toggleItem(key);
            setSelectedKeys(newSelected);
        };

        return (
            <div className="p-6 max-w-md mx-auto space-y-8">
                <div>
                    <h3 className="mb-2 font-semibold text-lg">Buah-buahan</h3>
                    <CheckboxAllToggle
                        allSelected={fruitsSelection.allSelected}
                        toggleAll={toggleAllFruits}
                        label="Pilih Semua Buah"
                    />
                    <CheckboxItemList<Item>
                        data={fruits}
                        selectedKeys={selectedKeys}
                        toggleItem={toggleFruitItem}
                        keySelector={(item) => item.id}
                        labelSelector={(item) => item.name}
                    />
                </div>

                <div>
                    <h3 className="mb-2 font-semibold text-lg">Sayuran</h3>
                    <CheckboxAllToggle
                        allSelected={vegetablesSelection.allSelected}
                        toggleAll={toggleAllVegetables}
                        label="Pilih Semua Sayur"
                    />
                    <CheckboxItemList<Item>
                        data={vegetables}
                        selectedKeys={selectedKeys}
                        toggleItem={toggleVegetableItem}
                        keySelector={(item) => item.id}
                        labelSelector={(item) => item.name}
                    />
                </div>

                <div className="mt-4 text-sm text-gray-600">
                    Dipilih: {selectedKeys.length > 0 ? selectedKeys.join(", ") : "Tidak ada"}
                </div>
            </div>
        )
    `;

    return { code, preview };
}

// Data dummy
const allFruits: Item[] = [
    { id: 'apple', name: 'Apple' },
    { id: 'banana', name: 'Banana' },
    { id: 'cherry', name: 'Cherry' },
];

const allVegetables: Item[] = [
    { id: 'carrot', name: 'Carrot' },
    { id: 'lettuce', name: "Lettuce" },
    { id: 'spinach', name: 'Spinach' },
];

// Tipe untuk data form kita
type MyFormValues = {
    selectedProduce: string[]; // Ini akan menyimpan semua ID item yang terpilih
};

function CheckboxRHFExample() {
    const {
        control,
        handleSubmit,
        watch, // Untuk melihat nilai form secara reaktif
        setValue, // Untuk memperbarui nilai form secara programatik
        formState: { errors },
    } = useForm<MyFormValues>({
        defaultValues: {
            selectedProduce: ['apple', 'carrot'], // Nilai default
        },
    });

    // Ambil nilai 'selectedProduce' saat ini dari RHF
    const currentSelectedProduce = watch('selectedProduce') || [];

    // --- Logika untuk Grup Buah ---
    const fruitKeys = allFruits.map(f => f.id);
    const fruitsSelection = useCheckboxSelectCrossRow(currentSelectedProduce, fruitKeys);

    const handleToggleAllFruits = () => {
        const newSelected = fruitsSelection.toggleAll();
        setValue('selectedProduce', newSelected, { shouldValidate: true, shouldDirty: true });
    };

    const handleToggleFruitItem = (key: string) => {
        const newSelected = fruitsSelection.toggleItem(key);
        setValue('selectedProduce', newSelected, { shouldValidate: true, shouldDirty: true });
    };

    // --- Logika untuk Grup Sayuran ---
    const vegetableKeys = allVegetables.map(v => v.id);
    const vegetablesSelection = useCheckboxSelectCrossRow(currentSelectedProduce, vegetableKeys);

    const handleToggleAllVegetables = () => {
        const newSelected = vegetablesSelection.toggleAll();
        setValue('selectedProduce', newSelected, { shouldValidate: true, shouldDirty: true });
    };

    const handleToggleVegetableItem = (key: string) => {
        const newSelected = vegetablesSelection.toggleItem(key);
        setValue('selectedProduce', newSelected, { shouldValidate: true, shouldDirty: true });
    };

    // Handler untuk submit form
    const onSubmit: SubmitHandler<MyFormValues> = data => {
        console.log('Form Submitted:', data);
        alert(`Selected Produce: ${data.selectedProduce.join(', ')}`);
    };

    const preview = (
        <div className="p-6 max-w-lg mx-auto space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Bagian Buah */}
                <section>
                    <h3 className="text-xl font-semibold mb-3 text-green-700">Fruits</h3>
                    <Controller
                        name="selectedProduce" // Nama field di RHF
                        control={control}
                        rules={{
                            validate: (value) => value && value.length > 0 || "Please select at least one produce item."
                        }} // Contoh validasi
                        render={({ field }) => ( // field.value adalah currentSelectedProduce
                            <>
                                <CheckboxAllToggle
                                    allSelected={fruitsSelection.allSelected}
                                    toggleAll={handleToggleAllFruits}
                                    label="Select All Fruits"
                                />
                                <CheckboxItemList<Item>
                                    data={allFruits}
                                    selectedKeys={field.value || []} // Gunakan field.value dari Controller
                                    toggleItem={handleToggleFruitItem}
                                    keySelector={(item) => item.id}
                                    labelSelector={(item) => item.name}
                                    className="mt-2 grid grid-cols-2 gap-2"
                                />
                            </>
                        )}
                    />
                </section>

                {/* Bagian Sayuran */}
                <section>
                    <h3 className="text-xl font-semibold mb-3 text-orange-700">Vegetables</h3>
                    {/* 
                        Kita tidak perlu Controller lagi di sini jika field RHF-nya sama ('selectedProduce').
                        Logika di atas sudah cukup. Yang penting adalah `CheckboxItemList`
                        mendapatkan `selectedKeys` yang benar (yaitu `currentSelectedProduce` atau `field.value` dari Controller jika kita membungkusnya lagi).
                        Dan `toggleItem`/`toggleAll` memanggil `setValue` dari RHF.
                    */}
                    <CheckboxAllToggle
                        allSelected={vegetablesSelection.allSelected}
                        toggleAll={handleToggleAllVegetables}
                        label="Select All Vegetables"
                    />
                    <CheckboxItemList<Item>
                        data={allVegetables}
                        selectedKeys={currentSelectedProduce} // Bisa juga ambil dari watch
                        toggleItem={handleToggleVegetableItem}
                        keySelector={(item) => item.id}
                        labelSelector={(item) => item.name}
                        className="mt-2 grid grid-cols-2 gap-2"
                    />
                </section>

                {errors.selectedProduce && (
                    <p className="text-red-500 text-sm mt-1">{errors.selectedProduce.message}</p>
                )}

                <Button type="submit" className="w-full">Submit Selection</Button>
            </form>

            <div className="mt-6 p-4 bg-gray-100 rounded">
                <h4 className="font-semibold text-gray-700">Current RHF `selectedProduce` value:</h4>
                <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                    {JSON.stringify(currentSelectedProduce, null, 2)}
                </pre>
            </div>
        </div>
    );

    const code = `
import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { CheckboxAllToggle } from '@/shared/components/form/CheckboxAllToggle'; // Sesuaikan path
import { CheckboxItemList } from '@/shared/components/form/CheckboxItemList'; // Sesuaikan path
import { useCheckboxSelectCrossRow } from '@/shared/hooks/useCheckboxSelectCrossRow'; // Sesuaikan path
import { Button } from '@/components/ui/button'; // Sesuaikan path ke Button Anda

type Item = {
    id: string;
    name: string;
};

const allFruits: Item[] = [
    { id: 'apple', name: 'Apple' },
    { id: 'banana', name: 'Banana' },
    { id: 'cherry', name: 'Cherry' },
];

const allVegetables: Item[] = [
    { id: 'carrot', name: 'Carrot' },
    { id: 'lettuce', name: "Lettuce" },
    { id: 'spinach', name: 'Spinach' },
];

type MyFormValues = {
    selectedProduce: string[];
};

export function MyRHFCheckboxForm() { // Nama komponen diubah agar bisa berdiri sendiri
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<MyFormValues>({
        defaultValues: {
            selectedProduce: ['apple', 'carrot'], // Contoh nilai default
        },
    });

    const currentSelectedProduce = watch('selectedProduce') || [];

    // Logika untuk Grup Buah
    const fruitKeys = allFruits.map(f => f.id);
    const fruitsSelection = useCheckboxSelectCrossRow(currentSelectedProduce, fruitKeys);

    const handleToggleAllFruits = () => {
        const newSelected = fruitsSelection.toggleAll();
        setValue('selectedProduce', newSelected, { shouldValidate: true, shouldDirty: true });
    };

    const handleToggleFruitItem = (key: string) => {
        const newSelected = fruitsSelection.toggleItem(key);
        setValue('selectedProduce', newSelected, { shouldValidate: true, shouldDirty: true });
    };

    // Logika untuk Grup Sayuran
    const vegetableKeys = allVegetables.map(v => v.id);
    const vegetablesSelection = useCheckboxSelectCrossRow(currentSelectedProduce, vegetableKeys);

    const handleToggleAllVegetables = () => {
        const newSelected = vegetablesSelection.toggleAll();
        setValue('selectedProduce', newSelected, { shouldValidate: true, shouldDirty: true });
    };

    const handleToggleVegetableItem = (key: string) => {
        const newSelected = vegetablesSelection.toggleItem(key);
        setValue('selectedProduce', newSelected, { shouldValidate: true, shouldDirty: true });
    };
    
    const onSubmit: SubmitHandler<MyFormValues> = data => {
        console.log('Form Submitted:', data);
        alert(\`Selected Produce: \${data.selectedProduce.join(', ')}\`);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-4 border rounded-md">
            {/* Bagian Buah */}
            <section>
                <h3 className="text-lg font-medium mb-2">Fruits</h3>
                <Controller
                    name="selectedProduce"
                    control={control}
                    rules={{ 
                        validate: (value) => (value && value.length > 0) || "Please select at least one produce item." 
                    }}
                    render={({ field }) => (
                        <>
                            <CheckboxAllToggle
                                allSelected={fruitsSelection.allSelected}
                                toggleAll={handleToggleAllFruits}
                                label="Select All Fruits"
                            />
                            <div className="mt-2 space-y-1"> {/* Wrapper untuk styling item list */}
                                <CheckboxItemList<Item>
                                    data={allFruits}
                                    selectedKeys={field.value || []}
                                    toggleItem={handleToggleFruitItem}
                                    keySelector={(item) => item.id}
                                    labelSelector={(item) => item.name}
                                />
                            </div>
                        </>
                    )}
                />
            </section>

            {/* Bagian Sayuran */}
            <section>
                <h3 className="text-lg font-medium mb-2">Vegetables</h3>
                {/* Untuk konsistensi dan jika ada validasi terpisah, bisa juga pakai Controller di sini */}
                {/* Namun, jika field RHF sama, logika tanpa Controller juga bisa */}
                <CheckboxAllToggle
                    allSelected={vegetablesSelection.allSelected}
                    toggleAll={handleToggleAllVegetables}
                    label="Select All Vegetables"
                />
                <div className="mt-2 space-y-1"> {/* Wrapper untuk styling item list */}
                    <CheckboxItemList<Item>
                        data={allVegetables}
                        selectedKeys={currentSelectedProduce}
                        toggleItem={handleToggleVegetableItem}
                        keySelector={(item) => item.id}
                        labelSelector={(item) => item.name}
                    />
                </div>
            </section>
            
            {errors.selectedProduce && (
                <p className="text-red-600 text-xs mt-1">{errors.selectedProduce.message}</p>
            )}

            <Button type="submit" className="w-full mt-4">Submit Selection</Button>

            {/* Untuk Debugging di contoh (opsional jika tidak ingin ini di-copy) */}
            <div className="mt-4 p-3 bg-gray-50 rounded text-xs">
                <h4 className="font-semibold">RHF Value (selectedProduce):</h4>
                <pre>{JSON.stringify(currentSelectedProduce, null, 2)}</pre>
            </div>
        </form>
    );
}
    `;

    return { preview, code };
}

export function CheckboxDoc() {
    const { code: codeCheckboxWithAllToggle, preview: previewCheckboxWithAllToggle } = ExampleCheckboxWithAllToggle();
    const { code: codeCheckboxItemListExample, preview: previewCheckboxItemListExample } = CheckboxItemListExample();
    const { code: codeCheckboxItemListExampleWithRender, preview: previewCheckboxItemListExampleWithRender } = CheckboxItemListExampleWithRender();
    const { code: codeCheckboxAllToggleWithItemListAndHookSingleRow, preview: previewCheckboxAllToggleWithItemListAndHookSingleRow } = CheckboxAllToggleWithItemListAndHookSingleRow();
    const { code: codeCheckboxCrossRowMultiExample, preview: previewCheckboxCrossRowMultiExample } = CheckboxCrossRowMultiExample();
    const { code: codeCheckboxRHFExample, preview: previewCheckboxRHFExample } = CheckboxRHFExample();

    return (
        <div className="space-y-8 p-4 md:p-6 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Panduan Komponen Checkbox</h1>
                <p className="text-lg text-gray-600">
                    Komponen <code>CheckboxAllToggle</code> dan <code>CheckboxItemList</code> dirancang untuk bekerja sama secara harmonis
                    dengan hook seleksi kami, mempermudah implementasi fungsionalitas <em>multi-seleksi</em> yang kompleks dalam daftar Anda.
                </p>
            </header>

            <PreviewBlock
                title="1. Dasar: Daftar Checkbox Seleksi Individual"
                description={
                    <>
                        <p>Menampilkan penggunaan dasar komponen <code>CheckboxItemList</code> untuk membuat daftar item yang dapat dipilih satu per satu.</p>
                        <p className="mt-2">Cocok untuk skenario di mana pengguna perlu memilih beberapa item dari sebuah koleksi. Contoh ini mengelola state seleksi (<code>selectedKeys</code> dan <code>toggleItem</code>) secara manual menggunakan hook <code>useState</code> di dalam komponen pengguna.</p>
                        <p className="mt-2"><strong>Komponen yang digunakan:</strong> <code>CheckboxItemList</code></p>
                    </>
                }
                preview={previewCheckboxItemListExample}
                code={codeCheckboxItemListExample}
            />

            <PreviewBlock
                title="2. 'Pilih Semua' dengan Logika Manual (Non-Hook)"
                description={
                    <>
                        <p>Menunjukkan cara implementasi fungsionalitas "Pilih Semua" secara manual dengan menggabungkan <code>CheckboxAllToggle</code> dan <code>CheckboxItemList</code>.</p>
                        <p className="mt-2">State (<code>selectedKeys</code>) dan logika (<code>toggleAll</code>, <code>toggleItem</code>, kalkulasi <code>allSelected</code>) dikelola langsung di komponen pengguna menggunakan <code>useState</code>.</p>
                        <p className="mt-2">Contoh ini berguna untuk memahami mekanisme dasar di balik fitur "Pilih Semua". Untuk solusi yang lebih ringkas dan terkelola, lihat contoh penggunaan hook.</p>
                        <p className="mt-2"><strong>Komponen yang digunakan:</strong> <code>CheckboxAllToggle</code>, <code>CheckboxItemList</code></p>
                    </>
                }
                preview={previewCheckboxWithAllToggle}
                code={codeCheckboxWithAllToggle}
            />

            <PreviewBlock
                title="3. Efisien: 'Pilih Semua' dengan Hook `useCheckboxSelectSingleRow`"
                description={
                    <>
                        <p>Cara <strong>paling direkomendasikan</strong> untuk fungsionalitas "Pilih Semua" yang mengelola satu grup item secara keseluruhan.</p>
                        <p className="mt-2">Hook <code>useCheckboxSelectSingleRow</code> menyederhanakan logika dengan menyediakan semua state dan fungsi yang dibutuhkan (<code>selectedKeys</code>, <code>allSelected</code>, <code>toggleAll</code>, <code>toggleItem</code>) secara otomatis.</p>
                        <p className="mt-2">Anda hanya perlu menyambungkan output hook ke props komponen <code>CheckboxAllToggle</code> dan <code>CheckboxItemList</code>. Hasilnya, kode lebih bersih dan mudah dipelihara.</p>
                        <p className="mt-2">
                            <strong>Komponen & Hook:</strong> <code>CheckboxAllToggle</code>, <code>CheckboxItemList</code>, <code>useCheckboxSelectSingleRow</code>
                        </p>
                    </>
                }
                preview={previewCheckboxAllToggleWithItemListAndHookSingleRow}
                code={codeCheckboxAllToggleWithItemListAndHookSingleRow}
            />

            <PreviewBlock
                title="4. Kustomisasi Tampilan: `renderItem` pada `CheckboxItemList`"
                description={
                    <>
                        <p>Manfaatkan prop <code>renderItem</code> pada <code>CheckboxItemList</code> untuk <strong>kontrol penuh</strong> atas tampilan setiap item dalam daftar.</p>
                        <p className="mt-2">Daripada menggunakan rendering default, Anda bisa menyediakan fungsi kustom yang menerima detail item (<code>item</code>) dan utilitas seleksi (<code>key</code>, <code>checked</code>, <code>toggle</code>), lalu mengembalikan JSX sesuai desain Anda.</p>
                        <p className="mt-2">Ini memungkinkan Anda untuk:</p>
                        <ul className="list-disc list-inside ml-4 mt-1">
                            <li>Mengubah struktur HTML per item.</li>
                            <li>Menerapkan styling unik atau conditional.</li>
                            <li>Menambahkan elemen interaktif atau informasi tambahan.</li>
                        </ul>
                        <p className="mt-2"><strong>Komponen yang digunakan:</strong> <code>CheckboxItemList</code> (dengan prop <code>renderItem</code>)</p>
                    </>
                }
                preview={previewCheckboxItemListExampleWithRender}
                code={codeCheckboxItemListExampleWithRender}
            />

            <PreviewBlock
                title="5. Lanjutan: 'Pilih Semua' untuk Beberapa Grup dengan `useCheckboxSelectCrossRow`"
                description={
                    <>
                        <p>Untuk skenario di mana Anda memiliki <strong>beberapa grup item independen</strong> (misalnya, Buah dan Sayuran) pada satu halaman, namun ingin mengelola "Pilih Semua" untuk tiap grup secara terpisah.</p>
                        <p className="mt-2">Hook <code>useCheckboxSelectCrossRow</code> adalah solusinya. Hook ini menerima state seleksi global (<code>selectedKeys</code>) dan daftar <em>target keys</em> untuk grup spesifik tersebut.</p>
                        <p className="mt-2">Setiap grup akan memiliki instance <code>CheckboxAllToggle</code> sendiri yang dikontrol oleh instance <code>useCheckboxSelectCrossRow</code> yang sesuai. Semua item yang terpilih dari berbagai grup akan tetap terkumpul dalam satu state <code>selectedKeys</code> global.</p>
                        <p className="mt-2">
                            <strong>Komponen & Hook:</strong> <code>CheckboxAllToggle</code>, <code>CheckboxItemList</code>, <code>useCheckboxSelectCrossRow</code>
                        </p>
                    </>
                }
                preview={previewCheckboxCrossRowMultiExample}
                code={codeCheckboxCrossRowMultiExample}
            />

            <PreviewBlock
                title="6. Integrasi Lanjutan: Dengan React Hook Form"
                description={
                    <>
                        <p>Contoh ini mendemonstrasikan cara mengintegrasikan sistem checkbox Anda dengan <strong>React Hook Form (RHF)</strong> untuk manajemen state form yang terpusat.</p>
                        <p className="mt-2">
                            State utama untuk item yang terpilih (<code>selectedProduce</code>) dikelola oleh RHF.
                            Komponen <code>CheckboxAllToggle</code> dan <code>CheckboxItemList</code> digunakan bersama hook <code>useCheckboxSelectCrossRow</code>
                            untuk menyediakan fungsionalitas "Pilih Semua" per grup (Buah dan Sayuran).
                        </p>
                        <ul className="list-disc list-inside ml-4 mt-1">
                            <li>RHF <code>watch</code> digunakan untuk mendapatkan nilai seleksi saat ini.</li>
                            <li>Handler <code>toggleAll</code> dan <code>toggleItem</code> memanggil fungsi dari <code>useCheckboxSelectCrossRow</code> dan kemudian memperbarui state RHF menggunakan <code>setValue</code>.</li>
                            <li>Komponen <code>Controller</code> dari RHF dapat digunakan untuk membungkus bagian form dan menghubungkannya dengan validasi RHF.</li>
                        </ul>
                        <p className="mt-2">Ini adalah pola yang kuat untuk form kompleks dengan beberapa grup checkbox yang nilainya perlu di-submit bersama.</p>
                        <p className="mt-2">
                            <strong>Komponen & Hook:</strong> <code>CheckboxAllToggle</code>, <code>CheckboxItemList</code>, <code>useCheckboxSelectCrossRow</code>, <code>react-hook-form (useForm, Controller)</code>
                        </p>
                    </>
                }
                preview={previewCheckboxRHFExample}
                code={codeCheckboxRHFExample}
            />
        </div>
    );
}
