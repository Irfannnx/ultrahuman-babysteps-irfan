'use client';

import { useState, useEffect } from 'react';

export interface Telemetry {
    latitude: string;
    longitude: string;
    altitude: number;
    heartRate: number;
    spo2: number;
    temperature: number;
    steps: number;
    status: 'SYNCING' | 'LIVE' | 'CALIBRATING';
}

/**
 * Simulates live telemetry data with plausible jitter.
 * Bengaluru coordinates with micro-drift to simulate GPS refresh.
 */
export function useTelemetry(): Telemetry {
    const [data, setData] = useState<Telemetry>({
        latitude: '12.963° N',
        longitude: '77.641° E',
        altitude: 920.4,
        heartRate: 62,
        spo2: 98,
        temperature: 36.6,
        steps: 4821,
        status: 'LIVE',
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setData((prev) => {
                // Smooth exponential drift for coordinates
                const latBase = 12.963;
                const lngBase = 77.641;
                const latJitter = (Math.random() - 0.5) * 0.002;
                const lngJitter = (Math.random() - 0.5) * 0.002;

                // Status flicker — very occasional
                const rand = Math.random();
                let newStatus: Telemetry['status'] = 'LIVE';
                if (rand > 0.97) newStatus = 'SYNCING';
                else if (rand > 0.94) newStatus = 'CALIBRATING';

                return {
                    latitude: `${(latBase + latJitter).toFixed(3)}° N`,
                    longitude: `${(lngBase + lngJitter).toFixed(3)}° E`,
                    altitude: Number((prev.altitude + (Math.random() - 0.5) * 0.3).toFixed(1)),
                    heartRate: Math.max(50, Math.min(100, prev.heartRate + Math.floor((Math.random() - 0.5) * 3))),
                    spo2: Math.max(95, Math.min(100, prev.spo2 + (Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0))),
                    temperature: Number((36.4 + Math.random() * 0.4).toFixed(1)),
                    steps: prev.steps + Math.floor(Math.random() * 3),
                    status: newStatus,
                };
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return data;
}