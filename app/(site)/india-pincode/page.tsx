import db from "@/app/lib/db";
import Link from "next/link";
import { RowDataPacket } from "mysql2";
import PageHeader from "@/app/components/PageHeader";

function formatSlug(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function IndiaPincodePage() {

  const [states] = await db.query<RowDataPacket[]>(
  `SELECT DISTINCT TRIM(state) AS state
   FROM indian_pincodes
   WHERE state IS NOT NULL
   AND TRIM(state) != ''
   ORDER BY TRIM(state)`
);

/* ================= CITY LIST ================= */

const [cities] = await db.query<RowDataPacket[]>(
  `SELECT DISTINCT TRIM(district) AS district
   FROM indian_pincodes
   WHERE district IS NOT NULL
   AND TRIM(district) != ''
   ORDER BY TRIM(district)
   LIMIT 200`
);

/* ================= REGION LIST ================= */

const [regions] = await db.query<RowDataPacket[]>(
  `SELECT DISTINCT TRIM(region) AS region
   FROM indian_pincodes
   WHERE region IS NOT NULL
   AND TRIM(region) != ''
   ORDER BY TRIM(region)`
);
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <PageHeader
        items={[
          { label: "India Pincode" }
        ]}
      />
      <h1 className="text-3xl font-bold mb-6">
        India Pincode List – State Wise
      </h1>

      <p className="text-gray-600 mb-8">
        Find postal codes of India by selecting your state. Click a state to view
        districts and pincodes.
      </p>

      {/* ===================== STATE GRID ===================== */}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">

        {states
          .filter((item) => item.state && item.state.trim() !== "")
          .map((item) => (
            <Link
              key={item.state}
              href={`/state/${formatSlug(item.state)}`}
              className="border rounded-xl p-3 text-[15px] hover:bg-indigo-50 hover:border-indigo-400 transition"
            >
              {item.state}
            </Link>
          ))}

      </div>


      {/* ===================== CITY WISE ===================== */}

      <h2 className="text-2xl font-bold mb-6">
        City Wise Pincode List
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">

        {cities
          .filter((item) => item.district && item.district.trim() !== "")
          .map((item) => (
            <Link
              key={item.district}
              href={`/city/${formatSlug(item.district)}`}
              className="border rounded-xl p-3 text-[15px] hover:bg-indigo-50 hover:border-indigo-400 transition"
            >
              {item.district}
            </Link>
          ))}

      </div>


      {/* ===================== REGION WISE ===================== */}

      <h2 className="text-2xl font-bold mb-6">
        Region Wise Pincode List
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">

        {regions
          .filter((item) => item.region && item.region.trim() !== "")
          .map((item) => (
            <Link
              key={item.region}
              href={`/region/${formatSlug(item.region)}`}
              className="border rounded-xl p-3 text-[15px] hover:bg-indigo-50 hover:border-indigo-400 transition"
            >
              {item.region}
            </Link>
          ))}

      </div>


      {/* ===================== SEO CONTENT ===================== */}

      <div className="mt-16 bg-white border rounded-2xl p-6 md:p-10 shadow-sm">

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          What is a Pincode in India?
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          A Pincode, also known as a Postal Index Number, is a six-digit code used
          by the Indian postal system to identify specific geographic regions,
          post offices, and delivery routes across the country. The system was
          introduced by India Post in 1972 to simplify mail delivery and reduce
          confusion caused by similar place names, spelling variations, and
          incomplete addresses.
        </p>

        <p className="text-gray-700 leading-relaxed mb-8">
          Today, the pincode system plays a vital role in logistics, courier
          services, government services, e-commerce deliveries, and official
          address identification. Every location in India, from large metropolitan
          cities to small villages, is assigned a unique pincode that helps postal
          workers and delivery companies route mail and packages accurately and
          efficiently.
        </p>


        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Structure of the Indian Pincode System
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          The Indian pincode consists of six digits. Each digit represents a
          specific geographic hierarchy used by India Post. Understanding this
          structure helps identify the exact region associated with a pincode.
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
          <li>The first digit represents the postal zone of India.</li>
          <li>The second digit indicates the sub-zone within that region.</li>
          <li>The third digit identifies the sorting district.</li>
          <li>The last three digits represent the specific post office.</li>
        </ul>

        <p className="text-gray-700 leading-relaxed mb-8">
          India is divided into nine postal zones, including eight geographic
          zones and one functional zone for the Indian Army. These zones cover
          different states and union territories across the country.
        </p>


        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Why Pincodes Are Important
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Pincodes are essential for ensuring that letters, parcels, and courier
          shipments reach the correct destination quickly and efficiently. With
          millions of deliveries happening daily across India, the postal code
          system acts as a standardized addressing format that minimizes errors
          and delays.
        </p>

        <p className="text-gray-700 leading-relaxed mb-8">
          In addition to postal services, pincodes are widely used in modern
          digital systems. Online shopping websites, banking platforms,
          insurance companies, and government services rely on pincodes to
          identify service availability in a specific area.
        </p>


        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          State-Wise Pincode Search
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          This page provides a complete list of Indian states where you can easily
          browse postal codes by location. By selecting a state from the list
          above, you will be able to explore districts, cities, and individual
          pincodes associated with that region.
        </p>

        <p className="text-gray-700 leading-relaxed mb-8">
          Each state page displays district-wise pincode listings, allowing users
          to navigate deeper into city and post office level information.
        </p>


        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          How to Find the Correct Pincode
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Finding the correct pincode is simple when you know the state and
          district of the location. Start by selecting your state from the list
          above. Next, choose the district or city you are looking for.
        </p>

        <p className="text-gray-700 leading-relaxed mb-8">
          Using the correct pincode ensures faster delivery of letters and
          packages and prevents misrouting of shipments.
        </p>


        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          India Post and the Postal Network
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          India Post operates one of the largest postal networks in the world,
          with more than 150,000 post offices across the country.
        </p>

        <p className="text-gray-700 leading-relaxed mb-8">
          Post offices in India are categorized into Head Post Offices,
          Sub Post Offices, and Branch Post Offices. Each facility has its
          own pincode that defines its delivery region.
        </p>


        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Explore Indian Pincodes by State
        </h2>

        <p className="text-gray-700 leading-relaxed">
          The state-wise pincode directory above provides an easy way to browse
          postal codes across India. Select a state to explore district-wise
          pincode lists and detailed postal information including post office
          names, delivery status, and branch types.
        </p>

      </div>
    </div>
  );
}