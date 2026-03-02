export function getCalculatorFAQSchema(
  slug: string,
  title?: string
) {
  const readableTitle =
    title ||
    slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

  const defaultFAQs = [
    {
      q: `How does the ${readableTitle} work?`,
      a: `The ${readableTitle} calculates results based on the values you enter using standard financial formulas.`
    },
    {
      q: `Is the ${readableTitle} accurate?`,
      a: `Yes, this calculator uses standard financial calculation formulas. Results may vary depending on lender terms and real-world conditions.`
    },
    {
      q: `Who should use the ${readableTitle}?`,
      a: `Anyone planning financial decisions related to ${readableTitle.toLowerCase()} can use this tool.`
    }
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": defaultFAQs.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };
}