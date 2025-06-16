// src/data/notificationsData.ts

/**
 * Type definition for a single notification item.
 * `color` is a Tailwind CSS text color class.
 */
export type Notification = {
    id: number;
    type: "payment" | "stock" | "supplier";
    title: string;
    message: string;
    date: string; // ISO datetime string
    color: string;
};

/**
 * Mock data for the notifications list.
 */
export const notifications: Notification[] = [
    {
        id: 1,
        type: "payment",
        title: "Payment Due",
        message: "Invoice #INV-2025-0432 is due in 2 days.",
        date: "2025-04-28T09:00:00Z",
        color: "text-red-600",
    },
    {
        id: 2,
        type: "stock",
        title: "Low Stock",
        message: "Stock for 'Tinta Printer Epson' is critically low.",
        date: "2025-04-28T10:30:00Z",
        color: "text-yellow-500",
    },
    {
        id: 3,
        type: "supplier",
        title: "Supplier Incoming",
        message: "PT Sumber Rejeki is delivering 15 items tomorrow.",
        date: "2025-04-28T11:45:00Z",
        color: "text-green-600",
    },
    {
        id: 4,
        type: "payment",
        title: "Payment Due",
        message: "Payment for PO #PO-9283 is overdue by 1 day.",
        date: "2025-04-27T14:00:00Z",
        color: "text-red-600",
    },
    {
        id: 5,
        type: "stock",
        title: "Low Stock",
        message: "Stok 'Kertas A4 80gsm' tinggal 5 pack.",
        date: "2025-04-26T16:30:00Z",
        color: "text-yellow-500",
    },
    {
        id: 6,
        type: "supplier",
        title: "Supplier Incoming",
        message: "CV Mitra Logistik sedang dalam perjalanan (ETA: 2 jam).",
        date: "2025-04-28T08:15:00Z",
        color: "text-green-600",
    },
    {
        id: 7,
        type: "stock",
        title: "Low Stock",
        message: "Toner 'Brother TN-3478' hanya tersisa 2 pcs.",
        date: "2025-04-25T12:10:00Z",
        color: "text-yellow-500",
    },
    {
        id: 8,
        type: "payment",
        title: "Payment Due",
        message: "Tagihan bulan April sebesar Rp12.500.000 akan jatuh tempo hari ini.",
        date: "2025-04-28T07:00:00Z",
        color: "text-red-600",
    },
    {
        id: 9,
        type: "supplier",
        title: "Supplier Incoming",
        message: "PT Sinar Mentari akan mengirimkan 30 unit laptop baru.",
        date: "2025-04-29T13:30:00Z",
        color: "text-green-600",
    },
];