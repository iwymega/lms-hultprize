import { ReactNode } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

type ModalSize = "sm" | "md" | "lg" | "xl" | "full"

const sizeClassMap: Record<ModalSize, string> = {
    sm: "sm:max-w-[400px]",
    md: "sm:max-w-[600px]",
    lg: "sm:max-w-[800px]",
    xl: "sm:max-w-[1000px]",
    full: "sm:max-w-full",
}

type ModalProps = {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    trigger?: ReactNode
    title?: string
    description?: string
    children: ReactNode
    footer?: ReactNode
    size?: ModalSize
}

export const Modal = ({
    open,
    onOpenChange,
    trigger,
    title,
    description,
    children,
    footer,
    size = "md",
}: ModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className={sizeClassMap[size]}>
                {(title || description) && (
                    <DialogHeader>
                        {title && <DialogTitle>{title}</DialogTitle>}
                        {description && <DialogDescription>{description}</DialogDescription>}
                    </DialogHeader>
                )}
                <div className="py-4">{children}</div>
                {footer && <DialogFooter>{footer}</DialogFooter>}
            </DialogContent>
        </Dialog>
    )
}
