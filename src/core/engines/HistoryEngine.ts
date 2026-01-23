import { Lecture, StudySession, Subject } from '../types';

export interface StudyRecord {
    id: string;
    subjectId: string;
    subjectName: string;
    itemType: 'LECTURE' | 'SECTION' | 'REVISION' | 'SESSION';
    itemName: string;
    durationMinutes: number;
    difficulty: number;
    grade?: string; // e.g. 'A+', 'B'
    cognitiveIndex?: number; // 0-10
    status: 'COMPLETED' | 'PENDING' | 'IN_PROGRESS';
    dateMeta: {
        fullDate: string; // YYYY-MM-DD
        dayName: string;
        weekIndex: number;
        timestamp: number;
    };
    rawDate: string; // ISO
}

export interface WeeklyBlock {
    weekIndex: number;
    label: string; // "Week 1"
    startDate: string; // YYYY-MM-DD (Saturday)
    endDate: string; // YYYY-MM-DD (Friday)
    isCurrentWeek: boolean;
    records: StudyRecord[];
    isCompleted: boolean; // All items in this week are green
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * HISTORY ENGINE
 * Aggregates Sessions and Lectures into a unified Weekly Timeline.
 * Enforces Saturday -> Friday week logic.
 */
export const HistoryEngine = {

    /**
     * Main aggregator function.
     */
    getWeeklyHistory: (
        sessions: StudySession[],
        lectures: Lecture[],
        subjects: Subject[]
    ): WeeklyBlock[] => {
        // 1. Flatten all entities into StudyRecords
        const allRecords: StudyRecord[] = [];

        // A. Process Sessions (Completed Study)
        sessions.forEach(session => {
            const subject = subjects.find(s => s.id === session.subjectId);

            // Robust Date Handling
            let dateVal = new Date();
            if (session.date) {
                // Handle Firestore Timestamp (if not converted yet)
                if (typeof session.date === 'object' && 'seconds' in (session.date as any)) {
                    dateVal = new Date((session.date as any).seconds * 1000);
                } else {
                    const parsed = new Date(session.date);
                    if (!isNaN(parsed.getTime())) dateVal = parsed;
                }
            } else if (session.startTime) {
                dateVal = new Date(session.startTime);
            }

            const meta = getDateMeta(dateVal);

            // Fetch Parent Item Name if possible
            let itemName = 'Study Session';
            let itemType: any = 'SESSION';

            // Try to resolve parent name
            if (session.lectureId) {
                const parent = lectures.find(l => l.id === session.lectureId);
                if (parent) {
                    itemName = parent.title;
                    itemType = 'SESSION'; // Could display as "Session: [Lecture Title]"
                }
            }

            allRecords.push({
                id: session.id,
                subjectId: session.subjectId,
                subjectName: subject ? subject.name : 'Unknown Subject',
                itemType: itemType,
                itemName: itemName,
                durationMinutes: session.actualDuration || 0,
                difficulty: 5, // Default
                grade: calculateGrade(session.performanceIndex || 0),
                cognitiveIndex: (session.performanceIndex || 0) / 10,
                status: 'COMPLETED',
                dateMeta: meta,
                rawDate: session.date || dateVal.toISOString()
            });
        });

        // B. Process Lectures (The Content Registry)
        // Lectures technically "happen" when created (Registered), or when completed.
        // Rule: Show them on their Creation Date as PENDING.
        // If they have a completed session, they might be marked completed?
        // Requirement: "Lecture becomes COMPLETED automatically when a session inside is completed"
        // For history view, we want to see the "Task" of the lecture.

        lectures.forEach(lecture => {
            const subject = subjects.find(s => s.id === lecture.subjectId);
            // Use creation date if available, else fallback to something (or exclude old ones?)
            const dateStr = lecture.createdAt || new Date().toISOString();
            const date = new Date(dateStr);
            const meta = getDateMeta(date);

            // Determine Status
            // Check if any session exists for this lecture
            const hasCompletedSession = sessions.some(s => s.lectureId === lecture.id && s.status === 'COMPLETED');
            const status = hasCompletedSession ? 'COMPLETED' : 'PENDING';

            allRecords.push({
                id: lecture.id,
                subjectId: lecture.subjectId,
                subjectName: subject ? subject.name : 'Unknown Subject',
                itemType: 'LECTURE', // Or map from lecture.type
                itemName: lecture.title,
                durationMinutes: lecture.duration,
                difficulty: lecture.relativeDifficulty,
                grade: lecture.grade,
                cognitiveIndex: lecture.cognitiveIndex,
                status: status,
                dateMeta: meta,
                rawDate: dateStr
            });
        });

        // 2. Group by Week Index
        const flowStart = getSystemStartDate(allRecords); // Find oldest record
        const groups = new Map<number, StudyRecord[]>();

        allRecords.forEach(record => {
            // Re-calc week index relative to system start to ensure continuity?
            // Actually, simpler: Use absolute week number from epoch or Year?
            // Let's use "Weeks since System Start" for now to keep it relative and clean 1, 2, 3...

            // To do this robustly:
            // Calculate diff in days between record date and flowStart (normalized to previous Saturday)
            const diffTime = Math.abs(record.dateMeta.timestamp - flowStart.getTime());
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            const weekIdx = Math.floor(diffDays / 7) + 1;

            if (!groups.has(weekIdx)) groups.set(weekIdx, []);
            groups.get(weekIdx)!.push(record);
        });

        // 3. Construct Blocks
        const blocks: WeeklyBlock[] = [];
        const sortedWeekIndices = Array.from(groups.keys()).sort((a, b) => a - b);

        sortedWeekIndices.forEach(idx => {
            const records = groups.get(idx)!.sort((a, b) => b.dateMeta.timestamp - a.dateMeta.timestamp); // Newest first within week? Or Chronological? Requirement: "Weeks appear oldest -> newest". Items inside? Usually chronological.

            // Re-sort items inside chronological (Sat -> Fri)
            records.sort((a, b) => a.dateMeta.timestamp - b.dateMeta.timestamp);

            const weekStart = new Date(flowStart);
            weekStart.setDate(flowStart.getDate() + (idx - 1) * 7);

            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);

            const isAllCompleted = records.every(r => r.status === 'COMPLETED');

            blocks.push({
                weekIndex: idx,
                label: `Week ${idx}`,
                startDate: formatDate(weekStart),
                endDate: formatDate(weekEnd),
                isCurrentWeek: isDateInRange(new Date(), weekStart, weekEnd),
                records,
                isCompleted: isAllCompleted
            });
        });

        return blocks;
    }
};

// --- HELPERS ---

// Enforce Saturday Start
function getDateMeta(date: Date) {
    return {
        fullDate: date.toISOString().split('T')[0],
        dayName: DAY_NAMES[date.getDay()],
        weekIndex: 0, // Placeholder, calculated later
        timestamp: date.getTime()
    };
}

function getSystemStartDate(records: StudyRecord[]): Date {
    if (records.length === 0) {
        const now = new Date();
        return getPreviousSaturday(now);
    }

    // Find earliest timestamp
    const stamps = records.map(r => r.dateMeta.timestamp).filter(t => !isNaN(t));
    if (stamps.length === 0) return getPreviousSaturday(new Date());

    const minTs = Math.min(...stamps);
    return getPreviousSaturday(new Date(minTs));
}

function getPreviousSaturday(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay(); // Sun=0, Sat=6
    // If Sat (6), diff is 0.
    // If Fri (5), diff is 6 (go back 6 days to Sat)
    // If Sun (0), diff is 1 (go back 1 day to Sat)

    // Target: 6 (Sat). 
    // (day + 1) % 7 calculates days passed since Saturday? 
    // Sat(6) + 1 = 7 % 7 = 0. Correct.
    // Sun(0) + 1 = 1. Back 1. Correct.
    // Fri(5) + 1 = 6. Back 6. Correct.

    const diff = (day + 1) % 7;
    d.setDate(d.getDate() - diff);
    d.setHours(0, 0, 0, 0);
    return d;
}

function formatDate(date: Date): string {
    const d = new Date(date);
    const month = d.toLocaleString('default', { month: 'short' });
    const day = d.getDate();
    return `${day} ${month}`;
}


function isDateInRange(target: Date, start: Date, end: Date) {
    return target >= start && target <= end;
}

function calculateGrade(index: number): string {
    // Index is 0-100 (PerformanceIndex)
    const val = index / 10; // Convert to 0-10
    if (val >= 9.7) return 'A+';
    if (val >= 9.0) return 'A';
    if (val >= 8.5) return 'B+';
    if (val >= 8.0) return 'B';
    if (val >= 7.5) return 'C+';
    if (val >= 7.0) return 'C';
    return 'D';
}

