// MapMarkers.tsx

/*
Task, same format:

Find and fix the bugs — 4 this time, since we're stepping up the difficulty a bit.
New feature to add: highlight the nearest marker's <li> in the list (e.g., bold text or a background color) so it's visually obvious which one is closest to center, in addition to the "Nearest: X" label already there.
*/
import { useState, useEffect } from 'react';

type Marker = {
    id: string;
    label: string;
    lat: number;
    lng: number;
    category: 'friendly' | 'hostile' | 'unknown';
};

type MapMarkersProps = {
    markers: Marker[];
    centerLat: number;
    centerLng: number;
};

function distance(lat1: number, lng1: number, lat2: number, lng2: number) {
    const dLat = lat2 - lat1;
    const dLng = lng2 - lng1;
    return Math.sqrt(dLat * dLat + dLng * dLng);
}

function MapMarkers({ markers, centerLat, centerLng }: MapMarkersProps) {
    const [visibleCategories, setVisibleCategories] = useState<Set<string>>(
        new Set(['friendly', 'hostile', 'unknown'])
    );
    const [nearest, setNearest] = useState<Marker | null>(null);

    const toggleCategory = (category: string) => {
        // visibleCategories.delete(category); 
        // setVisibleCategories(visibleCategories);

        //there is a bug here. This is mutating statue. 
        setVisibleCategories(prev => {
            const categories = new Set(prev);
            if (categories.has(category)) {
                categories.delete(category)
            } else {
                categories.add(category)
            }
            return categories;
        })
    };

    useEffect(() => {
        let closest: Marker | null = null;
        let closestDist = Infinity;

        //there was a bug here where the markers would be chosen using all. 
        //it should have been the relavent markers being chosesn
        const relevantMarkers = markers.filter(m => visibleCategories.has(m.category));


        for (const marker of relevantMarkers) {
            const d = distance(centerLat, centerLng, marker.lat, marker.lng);
            if (d < closestDist) {
                closestDist = d;
                closest = marker;
            }
        }

        setNearest(closest);
        //a bug here where there was no dependcy array
    }, [markers, centerLat, centerLng, visibleCategories]);

    const visibleMarkers = markers.filter(m => visibleCategories.has(m.category));

    return (
        <div>
            <div>
                {['friendly', 'hostile', 'unknown'].map(category => (
                    <label key={category}>
                        <input
                            type="checkbox"
                            checked={visibleCategories.has(category)}
                            onChange={() => toggleCategory(category)}
                        />
                        {category}
                    </label>
                ))}
            </div>

            <div>Nearest: {nearest?.label}</div>

            <ul>
                {visibleMarkers.map(marker => {
                    //a bug here where there was no id
                    return <li key={marker.id} style={{
                        color: marker.id === nearest?.id ? 'hotpink': undefined
                    }}>{marker.label} ({marker.category})</li>
                })}
            </ul>
        </div>
    );
}

export default MapMarkers;