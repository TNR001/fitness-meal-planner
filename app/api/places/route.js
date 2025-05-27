export async function POST(req) {
  const { lat, lng, radius, maxResultCount = 20 } = await req.json();

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeTypes = ["bakery", "cafe", "restaurant", "shopping_mall", "supermarket"];

  // Helper to fetch one type
  async function fetchType(type) {
    const body = {
      includedTypes: [type],
      maxResultCount,
      locationRestriction: {
        circle: {
          center: { latitude: lat, longitude: lng },
          radius,
        },
      },
    };

    const res = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.location,places.businessStatus,places.types,places.rating,places.shortFormattedAddress,places.photos,places.googleMapsLinks.directionsUri",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Google Places API error for type '${type}':`, errorText);
      return [];
    }

    const data = await res.json();
    return data.places || [];
  }

  // Fetch all types in parallel
  const results = await Promise.all(placeTypes.map(fetchType));
  // Group by type
  const grouped = {};
  placeTypes.forEach((type, idx) => {
    grouped[type] = results[idx];
  });

  // Also flatten all places if you want to pass all to meal planner
  const allPlaces = results.flat();

  return new Response(
    JSON.stringify({ grouped, allPlaces }),
    { status: 200 }
  );
}
