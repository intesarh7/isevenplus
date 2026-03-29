import PageHeader from "@/app/components/PageHeader";
import PincodeAutoSuggest from "@/app/components/PincodeAutoSuggest";
import db from "@/app/lib/db";
import { RowDataPacket } from "mysql2";
export const dynamic = "force-dynamic";


export default async function CityListPage() {

  const [cities] = await db.query<RowDataPacket[]>(
    `SELECT DISTINCT district, state
     FROM indian_pincodes
     WHERE district IS NOT NULL
     AND TRIM(district) != ''
     ORDER BY district ASC`
  );

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();


  /* ================= TOP CITIES ================= */

  const topCities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow"
  ];


  /* ================= POPULAR CITIES BY STATE ================= */

  const citiesByState: any = {};

  cities.forEach((row: any) => {
    if (!citiesByState[row.state]) {
      citiesByState[row.state] = [];
    }

    if (citiesByState[row.state].length < 6) {
      citiesByState[row.state].push(row.district);
    }
  });


  /* ================= A-Z CITIES ================= */

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const citiesByLetter: any = {};

  cities.forEach((row: any) => {
    const firstLetter = row.district.charAt(0).toUpperCase();

    if (!citiesByLetter[firstLetter]) {
      citiesByLetter[firstLetter] = [];
    }

    citiesByLetter[firstLetter].push(row.district);
  });



  return (
    <main className="max-w-6xl mx-auto py-12 px-4">
      <PageHeader
        items={[
          { label: "India Pincode", href: "/india-pincode" },
          { label: "All Cities" }
        ]}
      />
      <h1 className="text-3xl font-bold mb-8">
        Browse All Cities Pincode List
      </h1>

      <PincodeAutoSuggest />



      {/* ================= TOP CITIES ================= */}

      <section className="mt-12 mb-16">

        <h2 className="text-2xl font-semibold mb-6">
          Top Cities
        </h2>

        <div className="flex flex-wrap gap-3">

          {topCities.map((city, index) => (
            <a
              key={index}
              href={`/city/${generateSlug(city)}`}
              className="border px-4 py-2 rounded hover:bg-indigo-50 transition text-sm"
            >
              {city}
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



      {/* ================= ALPHABETICAL CITIES ================= */}

      <section className="mb-16">

        <h2 className="text-2xl font-semibold mb-6">
          Alphabetical Cities
        </h2>

        {alphabet.map((letter) => {

          const letterCities = citiesByLetter[letter];

          if (!letterCities) return null;

          return (
            <div key={letter} className="mb-8">

              <h3 className="text-xl font-bold mb-4">
                {letter}
              </h3>

              <div className="flex flex-wrap gap-3">

                {letterCities.map((city: string, index: number) => (
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
          );

        })}

      </section>



      {/* ================= ALL CITIES ================= */}

      <section className="mb-16">

        <h2 className="text-2xl font-semibold mb-6">
          All Cities
        </h2>

        <div className="flex flex-wrap gap-3">

          {cities.map((item: any, index: number) => (
            <a
              key={index}
              href={`/city/${generateSlug(item.district)}`}
              className="border px-4 py-2 rounded hover:bg-indigo-50 transition text-sm"
            >
              {item.district}
            </a>
          ))}

        </div>

      </section>



      {/* ================= SEO CONTENT ================= */}

      <section className="mt-16 bg-indigo-50 p-8 rounded-3xl">

        <h2 className="text-2xl font-bold mb-4">
          Explore Cities and Their Pincode Lists
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          The city directory above provides a comprehensive list of cities where you
          can explore detailed pincode and post office information. Each city in the
          list is connected to multiple postal areas and delivery offices that are
          managed by India Post. By selecting a city from the directory, users can
          quickly access a complete list of pincodes, post offices, and delivery
          locations associated with that city.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Postal codes, commonly known as pincodes in India, are essential for
          identifying the exact delivery area for mail, parcels, and courier
          shipments. Each city is divided into multiple postal zones and every zone
          has its own pincode. These pincodes help the postal system route letters
          and packages efficiently while ensuring that deliveries reach the correct
          location without confusion.
        </p>


        <h2 className="text-xl font-semibold mb-3">
          What is a City Pincode?
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          A city pincode refers to the postal code assigned to a specific area or
          locality within a city. India Post introduced the pincode system in 1972
          to simplify mail sorting and improve delivery accuracy across the country.
          Every pincode consists of six digits, and each digit has a specific
          meaning within the postal hierarchy.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          In large cities, multiple pincodes exist because different neighborhoods,
          business districts, and residential areas are served by separate post
          offices. These pincodes allow postal workers to quickly identify the
          correct delivery office responsible for distributing mail in that
          particular locality.
        </p>


        <h2 className="text-xl font-semibold mb-3">
          Structure of Indian Postal Codes
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Indian pincodes consist of six digits. The first digit represents the
          postal zone of India, while the second digit indicates the sub-zone within
          that region. The third digit identifies the sorting district responsible
          for handling incoming mail.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          The final three digits represent the individual post office that manages
          mail delivery in a specific locality. This hierarchical structure helps
          India Post manage one of the largest postal networks in the world while
          maintaining efficient mail routing and delivery operations.
        </p>


        <h2 className="text-xl font-semibold mb-3">
          Importance of Pincodes in Cities
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Pincodes play an important role in modern communication and logistics.
          Every address in India requires a correct pincode to ensure that letters,
          packages, and courier shipments reach the intended destination. Without
          the correct postal code, deliveries may be delayed or routed to the wrong
          location.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          In addition to postal services, pincodes are widely used by online
          shopping platforms, banking institutions, insurance providers, and
          government portals. These organizations rely on postal codes to verify
          addresses and provide location-based services to customers across
          different cities.
        </p>


        <h2 className="text-xl font-semibold mb-3">
          How to Find Pincodes by City
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Finding the correct pincode for a city is simple using the directory
          above. Start by selecting the city you want to explore. Once you open the
          city page, you will see a complete list of post offices along with their
          corresponding pincodes and delivery information.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Each pincode listing includes details such as the post office name,
          branch type, delivery status, and postal region. This information is
          useful for verifying addresses, sending mail, and planning logistics
          operations within that city.
        </p>


        <h2 className="text-xl font-semibold mb-3">
          India Post and the Urban Postal Network
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          India Post operates an extensive network of post offices that serve both
          urban and rural populations. In cities, postal services are typically
          handled by head post offices, sub post offices, and branch post offices.
          Each office is assigned a unique pincode that identifies its delivery
          jurisdiction.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          This organized network ensures that mail delivery remains efficient even
          in densely populated urban areas. Postal workers rely on pincodes to sort
          and distribute mail quickly, helping millions of letters and parcels
          reach their destinations every day.
        </p>


        <h2 className="text-xl font-semibold mb-3">
          Explore Postal Codes Across Different Cities
        </h2>

        <p className="text-gray-700 leading-relaxed">
          The city directory above allows users to browse postal codes for multiple
          cities across India. Whether you are looking for a pincode for mailing
          purposes, verifying an address, or checking delivery availability, this
          page provides a convenient and reliable way to access postal information
          for different cities. By selecting a city from the list, you can explore
          its postal infrastructure and find detailed pincode information for every
          locality.
        </p>

      </section>

    </main>
  );
}
