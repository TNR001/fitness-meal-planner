export default function NearbyPlaces({ places }) {
  // Sort places by distance (closest on top)
  const sortedPlaces = [...places].sort(
    (a, b) => (a.distanceMeters || 0) - (b.distanceMeters || 0)
  );

  return (
    <div className="flex flex-col gap-3">
      {sortedPlaces.length === 0 && (
        <div className="text-gray-400 text-center mt-12">
          No places found.
        </div>
      )}
      {sortedPlaces.map((place) => (
        <div
          key={place.id || place.displayName?.text}
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
  );
}
