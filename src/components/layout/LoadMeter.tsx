import clsx from 'clsx';
import styles from './LoadMeter.module.css';

interface LoadMeterProps {
    currentLoad: number;
    maxCapacity: number;
}

export function LoadMeter({ currentLoad, maxCapacity }: LoadMeterProps) {
    const percentage = Math.min((currentLoad / maxCapacity) * 100, 100);

    let status = 'safe';
    if (percentage > 70) status = 'warning';
    if (percentage > 90) status = 'risk';

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span>Daily Cognitive Load</span>
                <span>{Math.round(percentage)}%</span>
            </div>
            <div className={styles.track}>
                <div
                    className={clsx(styles.bar, styles[status])}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <div className={styles.statusText}>
                {status === 'safe' && "Optimal capacity available."}
                {status === 'warning' && "Approaching fatigue threshold."}
                {status === 'risk' && "CRITICAL: High burnout risk. Stop soon."}
            </div>
        </div>
    );
}
