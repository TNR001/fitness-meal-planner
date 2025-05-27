const PLACE_TYPES = [
  { type: "bakery", label: "Bakeries" },
  { type: "cafe", label: "Cafes" },
  { type: "restaurant", label: "Restaurants" },
  { type: "shopping_mall", label: "Shopping Malls" },
  { type: "supermarket", label: "Supermarkets" },
];

// Haversine formula for meters
function getDistanceMeters(lat1, lng1, lat2, lng2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function NearbyPlacesByType({ groupedPlaces, userLocation }) {
  return (
    <div className="flex flex-col gap-6">
      {PLACE_TYPES.map(({ type, label }) => {
        const places = (groupedPlaces[type] || []).map((place) => ({
          ...place,
          distanceMeters: userLocation.lat
            ? getDistanceMeters(
                userLocation.lat,
                userLocation.lng,
                place.location.latitude,
                place.location.longitude
              )
            : null,
        }));
        const top3 = places
          .sort((a, b) => (a.distanceMeters || 0) - (b.distanceMeters || 0))
          .slice(0, 3);

        return (
          <div key={type}>
            <h3 className="font-bold text-lg mb-2 text-blue-700">{label}</h3>
            {top3.length === 0 ? (
              <div className="text-gray-400 text-sm mb-4">
                No {label.toLowerCase()} found nearby.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {top3.map((place) => (
                  <div
                    key={place.id}
                    className="bg-white rounded-lg shadow border border-gray-200 flex flex-col items-center p-3"
                  >
                    <div className="font-bold text-blue-900 text-center">
                      {place.displayName?.text || "Unknown"}
                    </div>
                    <div className="text-xs text-gray-600 text-center">
                      {place.shortFormattedAddress}
                    </div>
                    {place.distanceMeters && (
                      <div className="text-xs text-gray-500 mt-1">
                        {(place.distanceMeters / 1000).toFixed(2)} km away
                      </div>
                    )}
                    {place.googleMapsLinks?.directionsUri && (
                      <a
                        href={place.googleMapsLinks.directionsUri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-xs text-blue-600 underline"
                      >
                        Get Directions
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
