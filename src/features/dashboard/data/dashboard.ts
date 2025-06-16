// src/data/dashboard.ts

// Data untuk Dashboard Cards (diambil dari DashboardMainContent.tsx)
// Catatan: nilai `change` akan dibangun di dalam komponen dengan t()
export const dashboardCardStats = [
    {
        id: 'sales',
        titleKey: "dashboard.total-sales-today",
        icon: "ShoppingCart",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        value: "$1,204.00",
        change: "+12%",
        changeSuffixKey: "dashboard.yesterday",
        changeType: "up" as "up",
    },
    {
        id: 'transactions',
        titleKey: "dashboard.total-transactions",
        icon: "CreditCard",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        value: "342",
        change: "+5%",
        changeSuffixKey: "dashboard.yesterday",
        changeType: "up" as "up",
    },
    {
        id: 'low-stock',
        titleKey: "dashboard.low-stock-warning",
        icon: "AlertTriangle",
        iconBg: "bg-yellow-100", // Disesuaikan agar lebih sesuai dengan warning
        iconColor: "text-yellow-600",
        value: "8 Items",
        change: "2",
        changeSuffixKey: "dashboard.new-warning",
        changeType: "down" as "down", // 'down' bisa berarti perhatian diperlukan
    },
    {
        id: 'new-customers',
        titleKey: "dashboard.new-customers-today",
        icon: "UserPlus",
        iconBg: "bg-green-100", // Disesuaikan agar lebih positif
        iconColor: "text-green-600",
        value: "24",
        change: "+9%",
        changeSuffixKey: "dashboard.yesterday",
        changeType: "up" as "up",
    },
];


// Data untuk CashflowChart
export const cashflowData = [
    { month: 'May', income: 60, expense: 30 },
    { month: 'Jun', income: 50, expense: 25 },
    { month: 'Jul', income: 40, expense: 15 },
    { month: 'Aug', income: 25, expense: 45 },
    { month: 'Sep', income: 45, expense: 30 },
    { month: 'Oct', income: 65, expense: 20 },
    { month: 'Nov', income: 55, expense: 35 },
    { month: 'Dec', income: 60, expense: 25 },
];

// Data untuk IncomeBreakdown
export const incomeBreakdownData = [
    { category: 'UI UX', percentage: 52, amount: 39419.76, color: 'bg-indigo-500', borderColor: 'border-indigo-500' },
    { category: 'Branding', percentage: 20, amount: 7883.95, color: 'bg-blue-400', borderColor: 'border-blue-400' },
    { category: 'Illustration', percentage: 15, amount: 5912.96, color: 'bg-teal-500', borderColor: 'border-teal-500' },
    { category: 'Web Dev', percentage: 13, amount: 5129.76, color: 'bg-orange-400', borderColor: 'border-orange-400' },
];

// Data untuk LatestTransactions (sudah ada di komponen, dipindahkan ke sini)
export const latestTransactionsData = [
    { id: 'INV_001', type: 'Project Payment', icon: 'CreditCard', user: 'Shin Tae Yong', time: '1 Jan 2024, 10.00', amount: 974.65, status: 'On Progress', statusColor: 'indigo' },
    { id: 'INV_002', type: 'Salary Payment', icon: 'CreditCard', user: 'Fridolina F Ferina', time: '1 Jan 2024, 12.30', amount: 617.28, status: 'Pending', statusColor: 'yellow' },
    { id: 'INV_003', type: 'Figma Subscribe', icon: 'PieChart', user: 'Figma', time: '30 Dec 2023, 16.15', amount: 148.01, status: 'Completed', statusColor: 'green' },
    { id: 'INV_004', type: 'Salary Payment', icon: 'CreditCard', user: 'Daffa Toldo', time: '27 Dec 2023, 21.45', amount: 422.35, status: 'Completed', statusColor: 'green' },
    { id: 'INV_005', type: 'Project Payment', icon: 'CreditCard', user: 'Carlo Ancelloti', time: '25 Dec 2023, 23.25', amount: 812.21, status: 'Canceled', statusColor: 'red' },
];

// Data lainnya dari file-file yang ada
export * from './salesData'; // Asumsi sales data ada di file terpisah
export * from './topCustomersData';
export * from './notificationsData';