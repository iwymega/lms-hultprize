import { CurrencyInput } from "@/shared/components/form/CurrencyInput";
import { Controller, useForm } from "react-hook-form";

const ExampleForm = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: { price: 0 },
    });

    const onSubmit = (data: any) => {
        console.log("Submit:", data); // { price: 1000000 }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="price"
                control={control}
                render={({ field }) => (
                    <CurrencyInput
                        value={field.value}
                        onChange={field.onChange}
                        locale="id-ID"
                        currency="IDR"
                        placeholder="Masukkan harga"
                        allowDecimal={false}
                    />
                )}
            />
            <button type="submit">Submit</button>
        </form>
    );
};
export default ExampleForm;