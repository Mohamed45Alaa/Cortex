import AppGate from '@/components/layout/AppGate';
import { GlobalSystemProviders } from '@/components/layout/GlobalSystemProviders';

export default function Page() {
    return (
        <GlobalSystemProviders>
            <AppGate />
        </GlobalSystemProviders>
    );
}
