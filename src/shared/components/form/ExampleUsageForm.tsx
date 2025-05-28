// pages/ExampleCheckboxPage.tsx
import React, { useState } from "react";
import { CheckboxAllToggle } from "./CheckboxAllToggle";
import { CheckboxItemList } from "./CheckboxItemList";
import { CurrencyInput } from "./CurrencyInput";
import { DigitalSignatureInput } from "./DigitalSignatureInput";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "./FormField";
import { Button } from "@/components/ui/button";
import ImageUploadWithDropzone from "./ImageUploadWithDropzone";
import { ImageUploadWithPreview } from "./ImageUploadWithPreview";
import { RadioItemList } from "./RadioItemList";
import SearchableSelect, { SelectOption } from "./SearchableSelect";

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

function ExampleCheckboxPage() {
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
    );
}

function ExampleCurrencyInput() {
    const [amount, setAmount] = useState(15000);
    const [usdAmount, setUsdAmount] = useState(0);

    return (
        <div className="p-6 max-w-md mx-auto space-y-6">
            <div>
                <h2 className="text-lg font-semibold mb-2">Currency Input - IDR (No Decimal)</h2>
                <CurrencyInput
                    value={amount}
                    onChange={setAmount}
                    locale="id-ID"
                    currency="IDR"
                    allowDecimal={false}
                    placeholder="Masukkan nominal"
                />
                <p className="mt-1 text-sm text-muted-foreground">
                    Nilai: {amount}
                </p>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-2">Currency Input - USD (Allow Decimal)</h2>
                <CurrencyInput
                    value={usdAmount}
                    onChange={setUsdAmount}
                    locale="en-US"
                    currency="USD"
                    allowDecimal={true}
                    placeholder="Enter amount"
                />
                <p className="mt-1 text-sm text-muted-foreground">
                    Value: {usdAmount}
                </p>
            </div>
        </div>
    );
}

function ExampleSignatureInput() {
    const [signature, setSignature] = useState<string>("");

    return (
        <div className="p-6 max-w-xl mx-auto space-y-6">
            <div>
                <h2 className="text-lg font-semibold mb-2">Digital Signature</h2>
                <DigitalSignatureInput
                    value={signature}
                    onChange={setSignature}
                    height={220}
                    strokeColor="#1e40af" // Tailwind blue-800
                />
                {signature && (
                    <div className="mt-4 space-y-2">
                        <p className="text-sm text-muted-foreground">Preview:</p>
                        <img src={signature} alt="Signature Preview" className="border rounded max-w-full" />
                    </div>
                )}
            </div>
        </div>
    );
}

const schema = z.object({
    name: z.string().min(1, "Nama wajib diisi"),
    email: z.string().email("Format email tidak valid"),
});

type FormData = z.infer<typeof schema>;

function ExampleFormField() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        alert(JSON.stringify(data, null, 2));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 space-y-6">
            <FormField
                name="name"
                label="Nama Lengkap"
                placeholder="Masukkan nama kamu"
                register={register}
                errors={errors}
            />

            <FormField
                name="email"
                label="Email"
                placeholder="contoh@email.com"
                type="email"
                register={register}
                errors={errors}
            />

            <Button type="submit" className="w-full">
                Submit
            </Button>
        </form>
    );
}

function ExampleImageUpload() {
    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-sm space-y-4">
            <h1 className="text-xl font-semibold">Upload Gambar</h1>
            <ImageUploadWithDropzone />
        </div>
    );
}

const options = [
    { id: "basic", name: "Basic Plan" },
    { id: "premium", name: "Premium Plan" },
];

const fruitOptions = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
];

const optionsMulti: SelectOption[] = [
    { label: "Design", value: "design" },
    { label: "Development", value: "development" },
    { label: "Marketing", value: "marketing" },
    { label: "Finance", value: "finance" },
];

function MultiSelectExample() {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(["development"]);

    return (
        <div className="max-w-sm mx-auto mt-10 space-y-4">
            <SearchableSelect
                options={optionsMulti}
                value={selectedValues}
                onChange={(val) => {
                    if (Array.isArray(val)) {
                        setSelectedValues(val);
                    }
                }}
                isMulti
                placeholder="Select departments"
            />

            <div className="text-sm text-gray-600">
                Selected: {selectedValues.length > 0 ? selectedValues.join(", ") : "None"}
            </div>
        </div>
    );
}


const ExampleUsageForm: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<string>(options[0].id);
    const [selectedFruit, setSelectedFruit] = useState<string | null>(null);
    return (
        <>
            <div className="p-6 max-w-md mx-auto space-y-4">
                <h2 className="text-lg font-semibold">Example Usage Form</h2>
                <ExampleCheckboxPage />
                <ExampleCurrencyInput />
                <ExampleSignatureInput />
                <ExampleImageUpload />
                <ImageUploadWithPreview
                    value={image}
                    onChange={setImage}
                    renderPreview={(_file, url, onRemove) => (
                        <div className="relative">
                            <img src={url} className="w-40 h-40 object-cover rounded" />
                            <button onClick={onRemove} className="absolute top-1 right-1">X</button>
                        </div>
                    )}
                    renderTrigger={(onClick) => (
                        <Button type="button" onClick={onClick} className="w-full">
                            Upload Image
                        </Button>
                    )}
                />
                <RadioItemList
                    data={options}
                    selectedKey={selectedPlan}
                    onChange={setSelectedPlan}
                    keySelector={(item) => item.id}
                    labelSelector={(item) => item.name}
                />
                <SearchableSelect
                    options={fruitOptions}
                    value={selectedFruit ?? undefined}
                    onChange={(val) => setSelectedFruit(typeof val === "string" ? val : null)}
                    placeholder="Choose a fruit"
                    isMulti={false}
                />
                <MultiSelectExample />
            </div>
            <div className="p-6 max-w-md mx-auto space-y-4">
                <h2 className="text-lg font-semibold">Example Form Field</h2>
                <ExampleFormField />
            </div>
        </>
    )
}

export default ExampleUsageForm