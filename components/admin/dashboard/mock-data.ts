
export interface ForensicLog {
    id: string;
    timestamp: string;
    type: 'ACCESS' | 'SYSTEM' | 'AUTH' | 'MOTION';
    message: string;
    location?: string;
}

export const MOCK_LOGS: ForensicLog[] = [
    { id: '1', timestamp: '10:42:33', type: 'ACCESS', message: 'Gate 4 entry recorded (ID: 4421)' },
    { id: '2', timestamp: '10:41:15', type: 'SYSTEM', message: 'Camera 7 feed stabilizer active' },
    { id: '3', timestamp: '10:38:59', type: 'AUTH', message: 'Admin user login from 192.168.1.42' },
    { id: '4', timestamp: '10:35:21', type: 'MOTION', message: 'Unusual movement detected in Sector R' },
    { id: '5', timestamp: '10:30:00', type: 'SYSTEM', message: 'Scheduled maintenance complete' },
    { id: '6', timestamp: '10:15:12', type: 'ACCESS', message: 'Server Room B access granted' },
    { id: '7', timestamp: '10:12:05', type: 'MOTION', message: 'Motion detected: Perimeter Fence' },
    { id: '8', timestamp: '09:55:42', type: 'AUTH', message: 'Failed login attempt (ID: Unknown)' },
];

export const MOCK_STATS = {
    uptime: 98.2,
    activeCameras: 42,
    forensicData: '1.4TB',
};

export const MOCK_LOCATIONS = [
    { id: 1, lat: 35, lng: -100, status: 'active', name: 'HQ - North America' }, // US
    { id: 2, lat: 50, lng: 10, status: 'active', name: 'Data Center - Europe' }, // Europe
    { id: 3, lat: 25, lng: 45, status: 'alert', name: 'Field Ops - Middle East' }, // Middle East
    { id: 4, lat: 10, lng: -10, status: 'active', name: 'Relay - Africa' }, // Africa
];
