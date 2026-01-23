import clsx from 'clsx';
import styles from './StatCard.module.css';

interface StatCardProps {
    label: string;
    value: string | number;
    trend?: 'up' | 'down' | 'neutral';
    status?: 'safe' | 'warning' | 'risk';
}

export function StatCard({ label, value, trend, status = 'safe' }: StatCardProps) {
    return (
        <div className={clsx(styles.card, styles[status])}>
            <h3 className={styles.label}>{label}</h3>
            <div className={styles.value}>{value}</div>
            {trend && <div className={styles.trend}>{trend === 'up' ? '↑' : '↓'}</div>}
        </div>
    );
}
