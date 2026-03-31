"use client";

import { useEffect, useState } from "react";

export default function PostOfficeLocator() {
    const [states, setStates] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [offices, setOffices] = useState<any[]>([]);
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedOffice, setSelectedOffice] = useState<any>(null);

    // ✅ NEW: loading states
    const [loadingStates, setLoadingStates] = useState(false);
    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [loadingOffices, setLoadingOffices] = useState(false);

    // Load states initially
    useEffect(() => {
        setLoadingStates(true);

        fetch("/api/locator/states")
            .then(res => res.json())
            .then(data => setStates(data))
            .finally(() => setLoadingStates(false));
    }, []);

    // Load districts when state changes
    useEffect(() => {
        if (!selectedState) return;

        setLoadingDistricts(true);

        fetch(`/api/locator/districts?state=${encodeURIComponent(selectedState)}`)
            .then(res => res.json())
            .then(data => {
                setDistricts(data);
                setOffices([]);
                setSelectedDistrict("");
                setSelectedOffice(null);
            })
            .finally(() => setLoadingDistricts(false));

    }, [selectedState]);

    // Load offices when district changes (debounce + loading)
    useEffect(() => {
        if (!selectedDistrict) return;

        const controller = new AbortController();
        setLoadingOffices(true);

        const delay = setTimeout(() => {

            fetch(`/api/locator/offices?state=${encodeURIComponent(selectedState)}&district=${encodeURIComponent(selectedDistrict)}`, {
                signal: controller.signal
            })
                .then(res => res.json())
                .then(data => {
                    setOffices(data);
                    setSelectedOffice(null);
                })
                .catch(err => {
                    if (err.name !== "AbortError") {
                        console.error(err);
                    }
                })
                .finally(() => setLoadingOffices(false));

        }, 300);

        return () => {
            controller.abort();
            clearTimeout(delay);
        };

    }, [selectedDistrict]);

    return (
        <div className="mx-auto">

            {/* State */}
            <select
                className="border p-3 rounded-xl w-full"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                disabled={loadingStates}
            >
                <option value="">
                    {loadingStates ? "Loading States..." : "Select State"}
                </option>
                {states
                    .filter((s) => s.state && s.state.trim() !== "")
                    .map((s, i) => (
                        <option key={i} value={s.state}>
                            {s.state}
                        </option>
                    ))}
            </select>

            {/* District */}
            {(districts.length > 0 || loadingDistricts) && (
                <select
                    className="border p-3 rounded-xl mt-4 w-full"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    disabled={loadingDistricts}
                >
                    <option value="">
                        {loadingDistricts ? "Loading Districts..." : "Select District"}
                    </option>
                    {districts
                        .filter((d) => d.district && d.district.trim() !== "")
                        .map((d, i) => (
                            <option key={i} value={d.district}>{d.district}</option>
                        ))}
                </select>
            )}

            {/* Post Office */}
            {(offices.length > 0 || loadingOffices) && (
                <select
                    className="border p-3 rounded-xl mt-4 w-full"
                    disabled={loadingOffices}
                    onChange={(e) => {
                        const office = offices.find(o => o.office_name === e.target.value);
                        setSelectedOffice(office);
                    }}
                >
                    <option value="">
                        {loadingOffices ? "Loading Offices..." : "Select Post Office"}
                    </option>
                    {offices
                        .filter((o) => o.office_name && o.office_name.trim() !== "")
                        .map((o, i) => (
                            <option key={i} value={o.office_name}>{o.office_name}</option>
                        ))}
                </select>
            )}

            {/* Final Details */}
            {selectedOffice && (
                <div className="mt-6 bg-white border rounded-xl shadow-sm p-6">

                    <h3 className="text-xl font-bold mb-4 text-indigo-600">
                        {selectedOffice.office_name}
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-200">
                            <tbody className="text-sm">

                                <tr className="border-b">
                                    <th className="p-3 bg-gray-50">Pincode</th>
                                    <td className="p-3">{selectedOffice.pincode}</td>
                                </tr>

                                <tr className="border-b">
                                    <th className="p-3 bg-gray-50">Branch Type</th>
                                    <td className="p-3">{selectedOffice.branch_type || "-"}</td>
                                </tr>

                                <tr className="border-b">
                                    <th className="p-3 bg-gray-50">Delivery Status</th>
                                    <td className="p-3">{selectedOffice.delivery_status || "-"}</td>
                                </tr>

                                <tr className="border-b">
                                    <th className="p-3 bg-gray-50">District</th>
                                    <td className="p-3">{selectedOffice.district}</td>
                                </tr>

                                <tr className="border-b">
                                    <th className="p-3 bg-gray-50">Division</th>
                                    <td className="p-3">{selectedOffice.division || "-"}</td>
                                </tr>

                                <tr className="border-b">
                                    <th className="p-3 bg-gray-50">Region</th>
                                    <td className="p-3">{selectedOffice.region || "-"}</td>
                                </tr>

                                <tr className="border-b">
                                    <th className="p-3 bg-gray-50">Taluk</th>
                                    <td className="p-3">{selectedOffice.taluk || "-"}</td>
                                </tr>

                                <tr className="border-b">
                                    <th className="p-3 bg-gray-50">Circle</th>
                                    <td className="p-3">{selectedOffice.circle || "-"}</td>
                                </tr>

                                <tr>
                                    <th className="p-3 bg-gray-50">State</th>
                                    <td className="p-3">{selectedOffice.state}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}