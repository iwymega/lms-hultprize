import {
    AlertTriangle,
    CreditCard,
    ShoppingCart,
    UserPlus,
} from "lucide-react"
import { useTranslation } from "react-i18next"
import { DashboardCard } from "./DashboardCard"
import SalesChart from "./SalesChart"
import TopCustomers from "./TopCustomers"
import LatestTransactions from "./LatestTransactions"
import Notifications from "./Notifications"
import CashflowChart from "./CashflowChart"
import IncomeBreakdown from "./IncomeBreakdown"
import { dashboardCardStats } from "@/features/dashboard/data/dashboard"

const iconMap = {
    ShoppingCart: (props: any) => <ShoppingCart {...props} />,
    CreditCard: (props: any) => <CreditCard {...props} />,
    AlertTriangle: (props: any) => <AlertTriangle {...props} />,
    UserPlus: (props: any) => <UserPlus {...props} />,
};

export default function DashboardMainContent() {
    const { t } = useTranslation();

    return (
        <main className="p-6 bg-gray-50 min-h-full">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {dashboardCardStats.map((card) => {
                    const IconComponent = iconMap[card.icon as keyof typeof iconMap];
                    return (
                        <DashboardCard
                            key={card.id}
                            title={t(card.titleKey)}
                            icon={<IconComponent className={`h-5 w-5 ${card.iconColor}`} />}
                            iconBg={card.iconBg}
                            value={card.value}
                            change={`${card.change} vs ${t(card.changeSuffixKey)}`}
                            changeType={card.changeType}
                            onDetailClick={() => console.log(`Detail clicked: ${card.titleKey}`)}
                        />
                    );
                })}
            </div>

            {/* Main Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
                <div className="lg:col-span-3">
                    <SalesChart />
                </div>
                <div className="lg:col-span-2">
                    <IncomeBreakdown />
                </div>
            </div>

            {/* Secondary Charts/Data Row */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
                <div className="lg:col-span-2">
                    <TopCustomers />
                </div>
                <div className="lg:col-span-3">
                    <CashflowChart />
                </div>
            </div>

            {/* Tables Row */}
            <div className="grid grid-cols-1 gap-6 mb-6">
                <LatestTransactions />
                <Notifications />
            </div>
        </main>
    )
}