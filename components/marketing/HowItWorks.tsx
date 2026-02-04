import { getHowItWorksSteps } from '@/app/actions/homepage';
import { HowItWorksClient } from './HowItWorksClient';
import { AlertCircle, Zap, Shield, CheckCircle } from 'lucide-react';

export async function HowItWorks() {
    let steps = await getHowItWorksSteps();

    // Fallback if DB is empty or fails
    if (!steps || steps.length === 0) {
        // Fallback data structure for SSG/Reliability
        steps = [
            { id: '1', title: 'The Event', description: 'Kingseye detects an unauthorized entry at a remote facility', step_number: '01', icon_name: 'AlertCircle', color_theme: 'from-primary to-orange-500' },
            { id: '2', title: 'The Analysis', description: 'AI processes threat level, location, and optimal response protocol', step_number: '02', icon_name: 'Zap', color_theme: 'from-tertiary to-accent-blue' },
            { id: '3', title: 'The Action', description: 'Automatically locks down Zone B, triggers perimeter lighting, initiates drone flyover', step_number: '03', icon_name: 'Shield', color_theme: 'from-secondary to-accent-purple' },
            { id: '4', title: 'The Result', description: 'Threat neutralized in < 60 seconds without risking a single human life', step_number: '04', icon_name: 'CheckCircle', color_theme: 'from-green-500 to-emerald-500' }
        ];
    }

    return <HowItWorksClient steps={steps} />;
}
