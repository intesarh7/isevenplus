"use client";

import { useEffect, useState } from "react";

export default function PostOfficeLocator() {
    const [states, setStates] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [offices, setOffices] = useState<any[]>([]);
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedOffice, setSelectedOffice] = useState<any>(null);

    // Load states initially
    useEffect(() => {
        fetch("/api/locator/states")
            .then(res => res.json())
            .then(data => setStates(data));
    }, []);

    // Load districts when state changes
    useEffect(() => {
        if (!selectedState) return;

        fetch(`/api/locator/districts?state=${selectedState}`)
            .then(res => res.json())
            .then(data => {
                setDistricts(data);
                setOffices([]);
                setSelectedDistrict("");
                setSelectedOffice(null);
            });
    }, [selectedState]);

    // Load offices when district changes
    useEffect(() => {
        if (!selectedDistrict) return;

        fetch(`/api/locator/offices?district=${selectedDistrict}`)
            .then(res => res.json())
            .then(data => {
                setOffices(data);
                setSelectedOffice(null);
            });
    }, [selectedDistrict]);

    return (
        <div className="bg-white shadow-lg p-6 rounded-xl max-w-3xl mx-auto">

            <h2 className="text-2xl font-bold mb-6 text-orange-600">
                Pincode / Post Office Locator Tool
            </h2>

            {/* State */}
            <select
                className="border p-3 rounded-xl mb-4"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
            >
                <option value="">Select State</option>
                {states
                    .filter((s) => s.state && s.state.trim() !== "")
                    .map((s, i) => (
                        <option key={i} value={s.state}>
                            {s.state}
                        </option>
                    ))}
            </select>

            {/* District */}
            {districts.length > 0 && (
                <select
                    className="border p-3 rounded-xl mb-4"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                    <option value="">Select District</option>
                    {districts
                    .filter((d) => d.district && d.district.trim() !== "")
                    .map((d, i) => (
                        <option key={i} value={d.district}>{d.district}</option>
                    ))}
                </select>
            )}

            {/* Post Office */}
            {offices.length > 0 && (
                <select
                    className="border p-3 rounded-xl mb-4"
                    onChange={(e) => {
                        const office = offices.find(o => o.office_name === e.target.value);
                        setSelectedOffice(office);
                    }}
                >
                    <option value="">Select Post Office</option>
                    {offices
                    .filter((o) => o.office_name && o.office_name.trim() !== "")                    
                    .map((o, i) => (
                        <option key={i} value={o.office_name}>{o.office_name}</option>
                    ))}
                </select>
            )}

            {/* Final Details */}
            {selectedOffice && (
                <div className="mt-6 border p-4 rounded bg-gray-50">
                    <h3 className="font-bold text-lg mb-2">{selectedOffice.office_name}</h3>
                    <p><strong>Pincode:</strong> {selectedOffice.pincode}</p>
                    <p><strong>District:</strong> {selectedOffice.district}</p>
                    <p><strong>State:</strong> {selectedOffice.state}</p>
                </div>
            )}
        </div>
    );
}