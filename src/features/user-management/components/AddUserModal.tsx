import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import useCreateUser from '@/services/user/hooks/useCreateUser'
import { CreateUser } from '@/services/user/schema/CreateUserSchema'
import { Modal } from '@/shared/components/modal/Modal'
import { useFormSubmit } from '@/shared/hooks/useFormSubmit'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const AddUserModal: React.FC = () => {
    const [open, setOpen] = useState(false)

    const { mutateAsync, isPending } = useCreateUser();  // Assuming `useCreateUser` is a hook for creating the user
    const { register, setError, handleSubmit, formState: { errors }, reset } = useForm<CreateUser>();  // Setup react-hook-form with typed form data

    // Use the form submit handler
    const { onSubmit } = useFormSubmit({
        mutate: mutateAsync,
        isPending: isPending,
        setError: setError,
        successMessage: "User created successfully!",
        errorMessage: "Failed to create user.",
        queryKeyToRefetch: ["user-list"], // Assuming you want to refetch the `users` query
        onSuccess: () => {
            setOpen(false);  // Close the modal on success
        }
    });

    useEffect(() => {
        if (!open) {
            reset({
                name: "",
                email: "",
                phone: "",
                password: "",
            });
        }
    }, [open, reset]);

    return (
        <Modal
            open={open}
            onOpenChange={setOpen}
            size="lg"
            title="Create User"
            description="Fill the form to create a new user."
            trigger={
                <Button onClick={() => setOpen(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4" />
                    Add User
                </Button>
            }
        >
            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input
                        id="full-name"
                        type="text"
                        placeholder="Enter full name"
                        className={cn("selection:bg-blue-300 selection:text-white border", errors.name ? "border-red-500" : "border-gray-300")}
                        {...register("name")}
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        className={cn("selection:bg-blue-300 selection:text-white border", errors.email ? "border-red-500" : "border-gray-300")}
                        {...register("email")}
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input
                        id="whatsapp"
                        type="text"
                        placeholder="Enter WhatsApp number"
                        className={cn("selection:bg-blue-300 selection:text-white border", errors.phone ? "border-red-500" : "border-gray-300")}
                        {...register("phone")}
                    />
                    {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        className={cn("selection:bg-blue-300 selection:text-white border", errors.password ? "border-red-500" : "border-gray-300")}
                        {...register("password")}
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                </div>
                <div className="flex items-center justify-end mt-4 gap-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isPending}>
                        {isPending ? 'Submitting...' : 'Save'}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export default AddUserModal