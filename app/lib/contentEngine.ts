type PostalData = {
    postal_code: string;
    place_name: string;
    admin1?: string;
    country_code: string;
    latitude?: string;
    longitude?: string;
};

const introTemplates = [
    (d: PostalData) =>
        `${d.postal_code} is the postal code of ${d.place_name}, located in ${d.admin1}, ${d.country_code}. It plays an important role in regional mail delivery systems.`,

    (d: PostalData) =>
        `The postal code ${d.postal_code} belongs to ${d.place_name} in ${d.admin1}, ${d.country_code}. It helps identify this region for efficient logistics and communication.`,

    (d: PostalData) =>
        `In ${d.country_code}, ${d.postal_code} is assigned to ${d.place_name}, a region in ${d.admin1}. It ensures accurate mail sorting and delivery.`
];

const geoTemplates = [
    (d: PostalData) =>
        `${d.place_name} is geographically located at coordinates ${d.latitude}, ${d.longitude}, making it easy to locate on global maps.`,

    (d: PostalData) =>
        `The location of ${d.place_name} can be identified using its coordinates (${d.latitude}, ${d.longitude}).`,

    (d: PostalData) =>
        `With coordinates ${d.latitude} latitude and ${d.longitude} longitude, ${d.place_name} can be precisely located on the map.`
];

const usageTemplates = [
    (d: PostalData) =>
        `Postal code ${d.postal_code} is widely used for courier services, eCommerce deliveries, and government documentation.`,

    (d: PostalData) =>
        `The postal code ${d.postal_code} helps businesses and delivery services operate efficiently in ${d.place_name}.`,

    (d: PostalData) =>
        `${d.postal_code} is essential for address verification, logistics planning, and regional identification.`
];

const extraTemplates = [
    (d: PostalData) =>
        `${d.place_name} is part of a broader postal network that connects nearby regions and supports transportation systems.`,

    (d: PostalData) =>
        `This postal region includes nearby zones that are interconnected for better mail flow and distribution.`,

    (d: PostalData) =>
        `The surrounding areas of ${d.place_name} are linked through this postal code for seamless communication.`
];

function pickRandom(arr: any[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function generatePostalContent(data: PostalData) {
    const intro = pickRandom(introTemplates)(data);
    const geo = pickRandom(geoTemplates)(data);
    const usage = pickRandom(usageTemplates)(data);
    const extra = pickRandom(extraTemplates)(data);

    return {
        intro,
        geo,
        usage,
        extra,
    };
}