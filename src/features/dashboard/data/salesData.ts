// src/data/salesData.ts

/**
 * Type definition for a single data point in the sales chart.
 */
export type SalesDataPoint = {
    date: string; // ISO-like date string, e.g., '2025-04-01'
    total: number; // Total sales for that day
};

/**
 * Mock sales data for the current month (e.g., April).
 * Represents 30 days of sales figures.
 */
export const salesDataThisMonth: SalesDataPoint[] = [
    { date: '2025-04-01', total: 3000000 },
    { date: '2025-04-02', total: 4500000 },
    { date: '2025-04-03', total: 5000000 },
    { date: '2025-04-04', total: 4000000 },
    { date: '2025-04-05', total: 6200000 },
    { date: '2025-04-06', total: 4800000 },
    { date: '2025-04-07', total: 7000000 },
    { date: '2025-04-08', total: 3500000 },
    { date: '2025-04-09', total: 6700000 },
    { date: '2025-04-10', total: 5100000 },
    { date: '2025-04-11', total: 5800000 },
    { date: '2025-04-12', total: 4200000 },
    { date: '2025-04-13', total: 6000000 },
    { date: '2025-04-14', total: 4500000 },
    { date: '2025-04-15', total: 7500000 },
    { date: '2025-04-16', total: 5200000 },
    { date: '2025-04-17', total: 3900000 },
    { date: '2025-04-18', total: 6300000 },
    { date: '2025-04-19', total: 4800000 },
    { date: '2025-04-20', total: 5600000 },
    { date: '2025-04-21', total: 7100000 },
    { date: '2025-04-22', total: 5300000 },
    { date: '2025-04-23', total: 4700000 },
    { date: '2025-04-24', total: 6800000 },
    { date: '2025-04-25', total: 5900000 },
    { date: '2025-04-26', total: 6100000 },
    { date: '2025-04-27', total: 4600000 },
    { date: '2025-04-28', total: 5800000 },
    { date: '2025-04-29', total: 5400000 },
    { date: '2025-04-30', total: 6200000 },
];

/**
 * Mock sales data for the previous month (e.g., March).
 * Represents 30 days of sales figures for comparison.
 */
export const salesDataLastMonth: SalesDataPoint[] = [
    { date: '2025-03-01', total: 2500000 },
    { date: '2025-03-02', total: 3000000 },
    { date: '2025-03-03', total: 4200000 },
    { date: '2025-03-04', total: 3800000 },
    { date: '2025-03-05', total: 5000000 },
    { date: '2025-03-06', total: 4000000 },
    { date: '2025-03-07', total: 6000000 },
    { date: '2025-03-08', total: 3200000 },
    { date: '2025-03-09', total: 5800000 },
    { date: '2025-03-10', total: 4500000 },
    { date: '2025-03-11', total: 5000000 },
    { date: '2025-03-12', total: 3800000 },
    { date: '2025-03-13', total: 5200000 },
    { date: '2025-03-14', total: 4100000 },
    { date: '2025-03-15', total: 6800000 },
    { date: '2025-03-16', total: 4800000 },
    { date: '2025-03-17', total: 3600000 },
    { date: '2025-03-18', total: 5700000 },
    { date: '2025-03-19', total: 4400000 },
    { date: '2025-03-20', total: 5300000 },
    { date: '2025-03-21', total: 6600000 },
    { date: '2025-03-22', total: 4800000 },
    { date: '2025-03-23', total: 4300000 },
    { date: '2025-03-24', total: 6000000 },
    { date: '2025-03-25', total: 5300000 },
    { date: '2025-03-26', total: 5600000 },
    { date: '2025-03-27', total: 4200000 },
    { date: '2025-03-28', total: 5000000 },
    { date: '2025-03-29', total: 4800000 },
    { date: '2025-03-30', total: 5500000 },
];