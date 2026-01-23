import { LoadMeter } from '@/components/layout/LoadMeter';
import { StatCard } from '@/components/layout/StatCard';
import styles from './page.module.css';

// Mock Data for Initial Render
const MOCK_DATA = {
    load: 120,
    maxLoad: 240,
    readiness: 72,
    warnings: 0
};

export default function Dashboard() {
    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <h1>Academic Control System</h1>
                <div className={styles.statusIndicator}>System Active</div>
            </header>

            <section className={styles.grid}>
                <div className={styles.loadSection}>
                    <LoadMeter currentLoad={MOCK_DATA.load} maxCapacity={MOCK_DATA.maxLoad} />
                </div>

                <StatCard
                    label="Exam Readiness"
                    value={`${MOCK_DATA.readiness}%`}
                    trend="up"
                />

                <StatCard
                    label="System Warnings"
                    value={MOCK_DATA.warnings}
                    status={MOCK_DATA.warnings > 0 ? 'warning' : 'safe'}
                />
            </section>

            <section className={styles.actions}>
                <button className={styles.primaryButton}>Register New Session</button>
                <button className={styles.secondaryButton}>Review Subjects</button>
            </section>
        </main>
    );
}
