// VehicleDetailPanel.tsx
import { useState, useEffect, useRef } from 'react';

type VehicleDetail = {
    id: string;
    name: string;
    battery: number;
    lastMaintenance: string;
};

type VehicleDetailPanelProps = {
    vehicleId: string | null;
    fetchVehicleDetail: (id: string) => Promise<VehicleDetail>;
};

function VehicleDetailPanel({ vehicleId, fetchVehicleDetail }: VehicleDetailPanelProps) {
    const [detail, setDetail] = useState<VehicleDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const req = useRef(0);

    useEffect(() => {
        if (!vehicleId) {
            setDetail(null);
            return;
        }

        setLoading(true);
        setError('');
        const currentReq = req.current + 1;
        req.current = currentReq;
        fetchVehicleDetail(vehicleId)
            .then(result => {
                if (currentReq === req.current) {
                    setDetail(result);
                }

            }).catch(() => {
                if (currentReq === req.current) {
                    setError('there was error fetching vehicles')
                }
            }).finally(() => {
                if (currentReq === req.current) {
                    setLoading(false)
                }

            });
    }, [vehicleId]);

    const isStale = detail !== null && detail.id !== vehicleId;

    if (!vehicleId) return <div>Select a vehicle to see details</div>;
    if (error) return <div>{error}</div>;
    if (loading || isStale) return <div>Loading...</div>;
    if (!detail) return null;

    return (
        <div>
            <h3>{detail.name}</h3>
            <div>Battery: {detail.battery}%</div>
            <div>Last maintenance: {detail.lastMaintenance}</div>
        </div>
    );
}

export default VehicleDetailPanel;