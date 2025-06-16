// src/data/topCustomersData.ts

/**
 * Type definition for a single top customer record.
 */
export type Customer = {
    id: number;
    name: string;
    totalSpent: number;
    totalTransactions: number;
    lastTransaction: string; // ISO date string, e.g., '2025-04-28'
};

/**
 * Mock data for the top customers list.
 */
export const topCustomers: Customer[] = [
    {
        id: 1,
        name: "Budi Santoso",
        totalSpent: 120000000,
        totalTransactions: 25,
        lastTransaction: "2025-04-28",
    },
    {
        id: 2,
        name: "Sari Wijaya",
        totalSpent: 98500000,
        totalTransactions: 18,
        lastTransaction: "2025-04-25",
    },
    {
        id: 3,
        name: "PT Amanah Sejahtera",
        totalSpent: 85000000,
        totalTransactions: 10,
        lastTransaction: "2025-04-27",
    },
    {
        id: 4,
        name: "Lina Permata",
        totalSpent: 74200000,
        totalTransactions: 20,
        lastTransaction: "2025-04-29",
    },
    {
        id: 5,
        name: "Dedi Gunawan",
        totalSpent: 70750000,
        totalTransactions: 22,
        lastTransaction: "2025-04-26",
    },
];