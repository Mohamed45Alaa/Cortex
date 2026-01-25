import { StudySession } from '../types';

export type FlowState =
    | 'AUTH_CHECK'
    | 'AUTH_LOGIN'
    | 'ORIENTATION' // New
    | 'SUBJECT_LIST' // New Home
    | 'DASHBOARD_HOME' // New: Main Dashboard
    | 'DASHBOARD_SUBJECT' // New: Detail View
    | 'DASHBOARD_SETTINGS' // New: Settings View
    | 'DASHBOARD_HISTORY' // New: History View
    | 'DASHBOARD_INPUTS' // New: Academic Inputs Control Panel
    | 'DASHBOARD_ACCOUNT' // New: Identity Management
    | 'DASHBOARD_CONFIG' // New: Global System Configuration
    | 'SUBJECT_ADD_NAME'
    | 'SUBJECT_SETUP_DATE'
    | 'INTENT' // Renamed logic to Subject Detail? Or kept for specific subject intent
    | 'INTENT_ACTION'
    | 'REG_TYPE'
    | 'REG_DURATION'
    | 'REG_UNDERSTANDING'
    | 'REG_DEMAND'
    | 'CALIBRATION_FAMILIARITY'
    | 'CALIBRATION_FOCUS'
    | 'CALIBRATION_TIME'
    | 'STUDY_EXECUTION'
    | 'REFLECTION_CHECK'
    | 'REFLECTION_REASON'
    | 'SUMMARY';

export interface FlowContext {
    currentState: FlowState;
    selectedSubjectId?: string;
    activeLectureId?: string; // Explicitly track lecture being studied
    actionType?: 'STUDY' | 'REGISTER';
    tempCalibration: {
        familiarity: number;
        focus: number; // 0-100
        time: number;
    };
    tempRegistration?: {
        type: string;
        duration: number; // minutes
        understanding: number;
        demand: string;
    };
    currentSessionId?: string;
    feedbackMessage?: string;
    predictedDuration?: number; // Added for Session Start Context
}

export const FlowEngine = {
    getInitialState: (): FlowContext => ({
        currentState: 'SUBJECT_LIST',
        selectedSubjectId: undefined,
        tempCalibration: {
            familiarity: 50,
            focus: 50,
            time: 25
        },
        tempRegistration: {
            type: 'Theory',
            duration: 60,
            understanding: 50,
            demand: 'Moderate'
        }
    }),

    /**
     * Determines the next state based on the current state and user input.
     */
    nextState: (current: FlowState, input: any): FlowState => {
        switch (current) {
            case 'ORIENTATION':
                return 'SUBJECT_LIST';


            case 'SUBJECT_LIST':
                if (input === 'ADD_SUBJECT') return 'SUBJECT_ADD_NAME';
                // Else input is subject ID
                return 'INTENT_ACTION'; // "What are you planning?" for selected subject

            case 'SUBJECT_ADD_NAME':
                return 'SUBJECT_LIST'; // Skip Exam Date Question

            case 'SUBJECT_SETUP_DATE':
                return 'SUBJECT_LIST'; // Done adding

            case 'INTENT':
                return 'INTENT_ACTION';

            case 'INTENT_ACTION':
                if (input === 'ACTION_REGISTER') return 'REG_TYPE';
                return 'CALIBRATION_FAMILIARITY';

            // --- REGISTRATION FLOW ---
            case 'REG_TYPE': return 'REG_DURATION';
            case 'REG_DURATION': return 'REG_UNDERSTANDING';
            case 'REG_UNDERSTANDING': return 'SUMMARY'; // Skipped REG_DEMAND
            case 'REG_DEMAND': return 'SUMMARY';

            // --- STUDY FLOW ---
            case 'CALIBRATION_FAMILIARITY': return 'CALIBRATION_FOCUS';
            case 'CALIBRATION_FOCUS': return 'CALIBRATION_TIME';
            case 'CALIBRATION_TIME': return 'STUDY_EXECUTION';
            case 'STUDY_EXECUTION': return 'REFLECTION_CHECK';
            case 'REFLECTION_CHECK': if (input === false) return 'REFLECTION_REASON'; return 'SUMMARY';
            case 'REFLECTION_REASON': return 'SUMMARY';

            case 'SUMMARY': return 'SUBJECT_LIST'; // Back to list

            default: return 'SUBJECT_LIST';
        }
    },

    /**
     * Returns the Translation Key for the current state.
     */
    getQuestionKey: (state: FlowState): string => {
        switch (state) {
            case 'SUBJECT_LIST': return 'subject_list_empty'; // Or special handling
            case 'SUBJECT_ADD_NAME': return 'subject_name';
            case 'SUBJECT_SETUP_DATE': return 'exam_date';

            case 'INTENT': return 'intent';
            case 'INTENT_ACTION': return 'action_required';

            case 'REG_TYPE': return 'type_q';
            case 'REG_DURATION': return 'duration_q';
            case 'REG_UNDERSTANDING': return 'understanding_q';
            case 'REG_DEMAND': return 'demand_q';

            case 'CALIBRATION_FAMILIARITY': return 'fam_q';
            case 'CALIBRATION_FOCUS': return 'focus_q';
            case 'CALIBRATION_TIME': return 'time_q';

            case 'STUDY_EXECUTION': return 'session_active';
            case 'REFLECTION_CHECK': return 'reflection_q';
            case 'REFLECTION_REASON': return 'reason_q';
            case 'SUMMARY': return 'cycle_complete';
            default: return '...';
        }
    }
};
