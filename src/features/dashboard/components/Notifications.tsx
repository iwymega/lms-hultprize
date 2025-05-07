import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

type Notification = {
    id: number;
    type: "payment" | "stock" | "supplier";
    title: string;
    message: string;
    date: string;
    color: string;
};

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

const Notifications: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="bg-white rounded-lg border">
            <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-lg font-medium">{t("dashboard.notification.title")}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t("dashboard.notification.table.type")}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t("dashboard.notification.table.title")}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t("dashboard.notification.table.message")}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t("dashboard.notification.table.date")}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t("dashboard.notification.table.action.title")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {notifications.map((notification) => (
                            <NotificationsItem notification={notification} key={notification.id} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Notifications

interface NotificationsItemProps {
    notification: Notification;
}

const NotificationsItem: React.FC<NotificationsItemProps> = ({ notification }) => {
    const { t } = useTranslation();
    return (
        <tr className="border-b">
            <td className={cn("px-6 py-4 whitespace-nowrap text-sm", notification.color)}>{notification.type}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{notification.title}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{notification.message}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{notification.date}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <Button variant="ghost" size="sm" className="h-6 px-2">
                    <span className="text-sm text-gray-500">{t("dashboard.notification.table.action.see-detail")}</span>
                    <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
            </td>
        </tr>
    )
}