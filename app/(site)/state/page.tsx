import PageHeader from "@/app/components/PageHeader";
import PincodeAutoSuggest from "@/app/components/PincodeAutoSuggest";
import db from "@/app/lib/db";
import { RowDataPacket } from "mysql2";
export const dynamic = "force-dynamic";

export default async function StateListPage() {

  const [states] = await db.query<RowDataPacket[]>(
    `SELECT DISTINCT state 
     FROM indian_pincodes
     WHERE state IS NOT NULL
     AND TRIM(state) != ''
     ORDER BY state ASC`
  );

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

  /* ================= TOP STATES ================= */

  const topStates = [
    "Uttar Pradesh",
    "Maharashtra",
    "Tamil Nadu",
    "Karnataka",
    "Gujarat",
    "Rajasthan",
    "Bihar",
    "West Bengal",
    "Madhya Pradesh",
    "Delhi"
  ];

  /* ================= POPULAR CITIES ================= */

  const [popularCities] = await db.query<RowDataPacket[]>(
    `SELECT state, district
     FROM indian_pincodes
     WHERE district IS NOT NULL
     AND TRIM(district) != ''
     GROUP BY state, district
     ORDER BY state ASC
     LIMIT 40`
  );

  /* ================= GROUP CITIES BY STATE ================= */

  const citiesByState: any = {};

  popularCities.forEach((row: any) => {
    if (!citiesByState[row.state]) {
      citiesByState[row.state] = [];
    }
    citiesByState[row.state].push(row.district);
  });



  /* ================= A-Z INDEX ================= */

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const statesByLetter: any = {};

  states.forEach((item: any) => {
    const firstLetter = item.state.charAt(0).toUpperCase();
    if (!statesByLetter[firstLetter]) {
      statesByLetter[firstLetter] = [];
    }
    statesByLetter[firstLetter].push(item.state);
  });

  return (
    <main className="max-w-6xl mx-auto py-12 px-4">
      <PageHeader
        items={[
          { label: "India Pincode", href: "/india-pincode" },
          { label: "All States" }
        ]}
      />
      <h1 className="text-3xl font-bold mb-8">
        Browse All States Pincode List
      </h1>

      <PincodeAutoSuggest />


      {/* ================= TOP STATES ================= */}

      <section className="mb-16 mt-4">

        <h2 className="text-2xl font-semibold mb-6">
          Top States
        </h2>

        <div className="flex flex-wrap gap-3">

          {topStates.map((state, index) => (
            <a
              key={index}
              href={`/state/${generateSlug(state)}`}
              className="border px-4 py-2 rounded hover:bg-indigo-50 transition text-sm"
            >
              {state}
            </a>
          ))}

        </div>

      </section>

      {/* ================= POPULAR CITIES BY STATE ================= */}

      <section className="mb-16">

        <h2 className="text-2xl font-semibold mb-6">
          Popular Cities by State
        </h2>

        {Object.keys(citiesByState).map((state) => (

          <div key={state} className="mb-8">

            <h3 className="text-xl font-bold mb-4">
              {state}
            </h3>

            <div className="flex flex-wrap gap-3">

              {citiesByState[state].map((city: string, index: number) => (
                <a
                  key={index}
                  href={`/city/${generateSlug(city)}`}
                  className="border px-4 py-2 rounded hover:bg-indigo-50 transition text-sm"
                >
                  {city}
                </a>
              ))}

            </div>

          </div>

        ))}

      </section>


      {/* ================= A-Z INDEX ================= */}

      <section className="mb-16">

        <h2 className="text-2xl font-semibold mb-6">
          Alphabetical State
        </h2>

        {alphabet.map((letter) => {

          const letterStates = statesByLetter[letter];

          if (!letterStates) return null;

          return (
            <div key={letter} className="mb-4">

              <h3 className="text-xl font-bold mb-2">
                {letter}
              </h3>

              <div className="flex flex-wrap gap-3">

                {letterStates.map((state: string, index: number) => (
                  <a
                    key={index}
                    href={`/state/${generateSlug(state)}`}
                    className="border px-4 py-2 rounded hover:bg-indigo-50 transition text-sm"
                  >
                    {state}
                  </a>
                ))}

              </div>

            </div>
          );

        })}

      </section>


      {/* ================= ALL STATES ================= */}

      <section className="mb-16">

        <h2 className="text-2xl font-semibold mb-6">
          All States
        </h2>

        <div className="flex flex-wrap gap-3">

          {states.map((item: any, index: number) => (
            <a
              key={index}
              href={`/state/${generateSlug(item.state)}`}
              className="border px-4 py-2 rounded hover:bg-indigo-50 transition text-sm"
            >
              {item.state}
            </a>
          ))}

        </div>

      </section>


      {/* ================= SEO CONTENT ================= */}


      <section className="bg-indigo-50 p-8 rounded-3xl">

        <h2 className="text-2xl font-bold mb-4">
          State Wise Pincode Directory of India
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          The state-wise pincode directory provides an organized way to
          explore postal codes across different states of India. Each state
          has hundreds or even thousands of pincodes that correspond to
          different districts, towns, villages, and local delivery areas.
          These postal codes are used by India Post to manage mail
          distribution and ensure that letters, parcels, and courier
          shipments reach the correct destination efficiently.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          This page lists all states where you can browse pincode
          information. By selecting a state from the list above, you can
          explore district-wise pincode directories and view detailed
          information about post offices, branch types, delivery status,
          and regional postal divisions.
        </p>


        <h2 className="text-xl font-semibold mb-3">
          What is a Pincode?
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          A pincode, also known as a Postal Index Number, is a six-digit
          numeric code used by the Indian postal system to identify
          specific delivery areas. The pincode system was introduced by
          India Post in 1972 to simplify mail sorting and reduce errors
          caused by similar place names or incomplete addresses.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Each pincode uniquely identifies a post office responsible for
          delivering mail within a specific geographic region. Including
          the correct pincode in an address helps postal workers quickly
          route letters and packages to the appropriate delivery office.
        </p>


        <h2 className="text-xl font-semibold mb-3">
          Structure of Indian Postal Codes
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Indian pincodes consist of six digits. The first digit represents
          the postal zone of India, while the second digit indicates the
          sub-zone within that region. The third digit identifies the
          sorting district responsible for processing incoming mail.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          The final three digits correspond to the individual post office
          that delivers mail within a specific locality. This hierarchical
          structure allows India Post to manage one of the largest postal
          networks in the world while maintaining efficient delivery
          operations across thousands of locations.
        </p>


        <h2 className="text-xl font-semibold mb-3">
          Importance of Pincodes in Logistics and E-Commerce
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Pincodes are widely used in modern logistics and online services.
          E-commerce platforms rely on postal codes to determine whether
          products can be delivered to a specific location. Courier
          companies use pincodes to calculate delivery routes, shipping
          costs, and estimated delivery times.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Banks, insurance providers, and government portals also use
          postal codes for address verification and service availability.
          Accurate pincodes help organizations provide reliable services
          to users across different states and cities.
        </p>


        <h2 className="text-xl font-semibold mb-3">
          How to Find Pincodes by State
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Finding a pincode by state is easy using this directory. Start by
          selecting the state you want to explore. Once you open the state
          page, you will see a list of districts and cities along with
          their corresponding pincode directories.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Each district page contains a complete list of post offices and
          pincodes associated with that area. These listings provide
          detailed information about branch offices, delivery status, and
          postal divisions.
        </p>


        <h2 className="text-xl font-semibold mb-3">
          Explore Postal Codes Across All States
        </h2>

        <p className="text-gray-700 leading-relaxed">
          The state directory above provides a convenient starting point
          for exploring postal codes across India. Whether you are
          searching for a pincode for mailing purposes, verifying an
          address, or planning logistics operations, this page helps you
          quickly navigate through different states and access detailed
          postal information for each region.
        </p>

      </section>


    </main>
  );
}
