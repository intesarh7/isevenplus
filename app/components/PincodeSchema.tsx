export default function PincodeSchema({
  pincode,
  city,
  state,
}: {
  pincode: string;
  city: string;
  state: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "PostalAddress",
    postalCode: pincode,
    addressLocality: city,
    addressRegion: state,
    addressCountry: "IN",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}