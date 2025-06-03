import { CheckboxAllToggle } from "@/shared/components/form/CheckboxAllToggle";
import { CheckboxItemList } from "@/shared/components/form/CheckboxItemList";
import { useCheckboxSelectSingleRow } from "@/shared/hooks/useCheckboxSelectSingleRow";
import { CheckboxPreviewBlock } from "./CheckboxPreviewBlock";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useCheckboxSelectCrossRow } from "@/shared/hooks/useCheckboxSelectCrossRow";

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

export function CheckboxDoc() {
    const { code: codeCheckboxWithAllToggle, preview: previewCheckboxWithAllToggle } = ExampleCheckboxWithAllToggle();
    const { code: codeCheckboxItemListExample, preview: previewCheckboxItemListExample } = CheckboxItemListExample();
    const { code: codeCheckboxItemListExampleWithRender, preview: previewCheckboxItemListExampleWithRender } = CheckboxItemListExampleWithRender();
    const { code: codeCheckboxAllToggleWithItemListAndHookSingleRow, preview: previewCheckboxAllToggleWithItemListAndHookSingleRow } = CheckboxAllToggleWithItemListAndHookSingleRow();
    const { code: codeCheckboxCrossRowMultiExample, preview: previewCheckboxCrossRowMultiExample } = CheckboxCrossRowMultiExample();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Dokumentasi Checkbox</h1>
            <p>CheckboxAllToggle dan CheckboxItemList bisa digunakan bareng hook seleksi untuk mempermudah multi-select di list.</p>

            <CheckboxPreviewBlock
                title="Checkbox dengan Seleksi Sederhana"
                description="Contoh penggunaan checkbox dengan seleksi sederhana"
                preview={previewCheckboxItemListExample}
                code={codeCheckboxItemListExample}
            />

            <CheckboxPreviewBlock
                title="Checkbox dengan Render Kustom"
                description={
                    <>
                        Contoh penggunaan checkbox dengan <strong>render kustom</strong> pada tiap item daftar.
                        <br />
                        Render kustom berarti kita tidak hanya menggunakan komponen checkbox standar, tetapi juga
                        mendefinisikan sendiri bagaimana setiap item checkbox ditampilkan secara detail.
                        <br />
                        Dalam contoh ini, kita menyediakan fungsi <code>renderItem</code> yang menerima data item
                        beserta properti kontrol checkbox (seperti <code>checked</code> dan fungsi <code>toggle</code>)
                        dan mengembalikan JSX yang dapat disesuaikan sepenuhnya, termasuk label, styling, dan event handling.
                        <br />
                        Dengan cara ini, kamu dapat mengubah tampilan dan perilaku checkbox dan labelnya secara fleksibel sesuai kebutuhan desain atau UX aplikasi kamu.
                    </>
                }
                preview={previewCheckboxItemListExampleWithRender}
                code={codeCheckboxItemListExampleWithRender}
            />

            <CheckboxPreviewBlock
                title="Checkbox dengan Toggle Semua"
                description={`
                    Contoh penggunaan checkbox dengan tombol "Pilih Semua" yang mengontrol seleksi semua item sekaligus. 
                    Hook useCheckboxSelectSingleRow mengelola status pilihan dan fungsi toggle, sementara daftar checkbox dan labelnya di-render dengan CheckboxItemList. 
                    Memudahkan implementasi seleksi massal dengan sedikit kode.
                `}
                preview={previewCheckboxAllToggleWithItemListAndHookSingleRow}
                code={codeCheckboxAllToggleWithItemListAndHookSingleRow}
            />

            <CheckboxPreviewBlock
                title="Checkbox dengan Seleksi Baris Silang"
                description="Contoh penggunaan checkbox dengan seleksi baris silang untuk kategori berbeda"
                preview={previewCheckboxCrossRowMultiExample}
                code={codeCheckboxCrossRowMultiExample}
            />

            <CheckboxPreviewBlock
                title="Checkbox dengan Toggle Semua (Non-Hook)"
                description="Contoh penggunaan checkbox dengan toggle semua untuk daftar item tanpa menggunakan hook"
                preview={previewCheckboxWithAllToggle}
                code={codeCheckboxWithAllToggle}
            />
        </div>
    );
}
