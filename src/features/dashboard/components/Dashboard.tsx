import DashboardMainContent from './DashboardMainContent';

/**
 * This component serves as the entry point for the dashboard 
 * when used as a micro-frontend (MFE) via module federation.
 * It simply wraps the main content, ensuring it can be easily
 * consumed by other applications without any surrounding layout.
 */
export default function Dashboard() {
    // Anda bisa menambahkan MFE-specific providers atau logic di sini jika perlu
    return <DashboardMainContent />;
}