import {
    AlertTriangle,
    CreditCard,
    ShoppingCart,
    UserPlus,
} from "lucide-react"
import { DashboardCard } from "./DashboardCard"
import SalesChart from "./SalesChart"
import TopCustomers from "./TopCustomers"
import LatestTransactions from "./LatestTransactions"
import Notifications from "./Notifications"
import { useTranslation } from "react-i18next"

export default function DashboardMainContent() {
    const { t } = useTranslation();
    const dashboardCards = [
        {
            title: t("dashboard.total-sales-today"),
            icon: <ShoppingCart className="h-4 w-4 text-green-600" />,
            iconBg: "bg-green-100",
            value: "$1,204.00",
            change: "+12% vs " + t("dashboard.yesterday"),
            changeType: "up" as "up",
        },
        {
            title: t("dashboard.total-transactions"),
            icon: <CreditCard className="h-4 w-4 text-blue-600" />,
            iconBg: "bg-blue-100",
            value: "342",
            change: "+5% vs " + t("dashboard.yesterday"),
            changeType: "up" as "up",
        },
        {
            title: t("dashboard.low-stock-warning"),
            icon: <AlertTriangle className="h-4 w-4 text-yellow-600" />,
            iconBg: "bg-yellow-100",
            value: "8 Items",
            change: "2 " + t("dashboard.new-warning"),
            changeType: "down" as "down",
        },
        {
            title: t("dashboard.new-customers-today"),
            icon: <UserPlus className="h-4 w-4 text-indigo-600" />,
            iconBg: "bg-indigo-100",
            value: "24",
            change: "+9% vs " + t("dashboard.yesterday"),
            changeType: "up" as "up",
        },
    ]

    return (
        <main className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
                {dashboardCards.map((card, idx) => (
                    <DashboardCard
                        key={idx}
                        {...card}
                        onDetailClick={() => console.log(`Detail clicked: ${card.title}`)}
                    />
                ))}
            </div>

            {/* Charts */}
            <div className="mb-6">
                <SalesChart />
            </div>

            {/* Top Customer, Latest Transactions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {/* Top Customer */}
                <TopCustomers />
                {/* Transaction History */}
                <LatestTransactions />
            </div>

            <div className="mb-6">
                <Notifications />
            </div>
        </main>
    )
}