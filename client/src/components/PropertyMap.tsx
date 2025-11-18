import { useEffect, useRef, useState } from "react";
import { MapView } from "./Map";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { MapPin, Navigation, Maximize2 } from "lucide-react";

interface PropertyMapProps {
  property: "514-whitehall" | "assemblage";
  className?: string;
}

export function PropertyMap({ property, className }: PropertyMapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapReady, setMapReady] = useState(false);

  // Property coordinates
  const property514 = { lat: 33.743, lng: -84.4046 };
  const assemblage = { lat: 33.7448, lng: -84.4038 };
  const stadium = { lat: 33.7553, lng: -84.4006 };
  const forgeAtlanta = { lat: 33.7485, lng: -84.3985 };

  const propertyLocation = property === "514-whitehall" ? property514 : assemblage;

  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;
    setMapReady(true);

    // Add property marker
    new google.maps.marker.AdvancedMarkerElement({
      map,
      position: propertyLocation,
      title: property === "514-whitehall" ? "514 Whitehall St SW" : "Whitehall Assemblage",
    });

    // Add stadium marker
    const stadiumMarker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: stadium,
      title: "Mercedes-Benz Stadium",
    });

    // Add Forge Atlanta marker
    const forgeMarker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: forgeAtlanta,
      title: "Forge Atlanta Development",
    });

    // Draw walking radius circles (0.5 mi and 1.0 mi)
    const metersPerMile = 1609.34;
    
    // 0.5 mile radius
    new google.maps.Circle({
      map,
      center: stadium,
      radius: 0.5 * metersPerMile,
      strokeColor: "#3b82f6",
      strokeOpacity: 0.6,
      strokeWeight: 2,
      fillColor: "#3b82f6",
      fillOpacity: 0.1,
    });

    // 1.0 mile radius
    new google.maps.Circle({
      map,
      center: stadium,
      radius: 1.0 * metersPerMile,
      strokeColor: "#8b5cf6",
      strokeOpacity: 0.6,
      strokeWeight: 2,
      fillColor: "#8b5cf6",
      fillOpacity: 0.1,
    });

    // Draw property boundary (approximate)
    if (property === "514-whitehall") {
      // 11,500 sq ft lot (approximately 120' x 100')
      const boundaryCoords = [
        { lat: 33.7432, lng: -84.4048 },
        { lat: 33.7432, lng: -84.4044 },
        { lat: 33.7428, lng: -84.4044 },
        { lat: 33.7428, lng: -84.4048 },
      ];

      new google.maps.Polygon({
        map,
        paths: boundaryCoords,
        strokeColor: "#10b981",
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: "#10b981",
        fillOpacity: 0.2,
      });
    } else {
      // Assemblage: 2.31 acres (approximately 600' x 170')
      const boundaryCoords = [
        { lat: 33.7455, lng: -84.4042 },
        { lat: 33.7455, lng: -84.4034 },
        { lat: 33.7441, lng: -84.4034 },
        { lat: 33.7441, lng: -84.4042 },
      ];

      new google.maps.Polygon({
        map,
        paths: boundaryCoords,
        strokeColor: "#10b981",
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: "#10b981",
        fillOpacity: 0.2,
      });
    }

    // Draw line to stadium
    new google.maps.Polyline({
      map,
      path: [propertyLocation, stadium],
      geodesic: true,
      strokeColor: "#ec4899",
      strokeOpacity: 0.7,
      strokeWeight: 3,
    });

    // Calculate and display distance
    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(propertyLocation),
      new google.maps.LatLng(stadium)
    );
    const distanceMiles = (distance / metersPerMile).toFixed(2);

    // Add info window with distance
    const infoWindow = new google.maps.InfoWindow({
      content: `<div style="color: #000; padding: 8px;">
        <strong>${property === "514-whitehall" ? "514 Whitehall" : "Whitehall Assemblage"}</strong>
        <br/>
        ${distanceMiles} miles to Mercedes-Benz Stadium
        <br/>
        ${Math.round(parseFloat(distanceMiles) * 20)} minute walk
      </div>`,
      position: propertyLocation,
    });

    // Show info window after 1 second
    setTimeout(() => {
      infoWindow.open(map);
    }, 1000);
  };

  const centerOnProperty = () => {
    if (mapRef.current) {
      mapRef.current.setCenter(propertyLocation);
      mapRef.current.setZoom(17);
    }
  };

  const centerOnStadium = () => {
    if (mapRef.current) {
      mapRef.current.setCenter(stadium);
      mapRef.current.setZoom(15);
    }
  };

  const showOverview = () => {
    if (mapRef.current) {
      // Calculate bounds to show both property and stadium
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(propertyLocation);
      bounds.extend(stadium);
      mapRef.current.fitBounds(bounds);
    }
  };

  return (
    <Card className={`bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden ${className}`}>
      <div className="relative">
        <MapView
          initialCenter={propertyLocation}
          initialZoom={15}
          onMapReady={handleMapReady}
          className="h-[600px]"
        />

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 hover:bg-white text-gray-900"
            onClick={centerOnProperty}
            disabled={!mapReady}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Property
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 hover:bg-white text-gray-900"
            onClick={centerOnStadium}
            disabled={!mapReady}
          >
            <Navigation className="w-4 h-4 mr-2" />
            Stadium
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 hover:bg-white text-gray-900"
            onClick={showOverview}
            disabled={!mapReady}
          >
            <Maximize2 className="w-4 h-4 mr-2" />
            Overview
          </Button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 text-gray-900 text-sm">
          <div className="font-bold mb-2">Map Legend</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Property Boundary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full opacity-30"></div>
              <span>0.5 mi Radius</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full opacity-30"></div>
              <span>1.0 mi Radius</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-pink-500"></div>
              <span>Distance to Stadium</span>
            </div>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-gray-400 mb-1">Distance to Stadium</div>
            <div className="text-lg font-bold">
              {property === "514-whitehall" ? "1.0 mi" : "0.6 mi"}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-1">Walking Time</div>
            <div className="text-lg font-bold">
              {property === "514-whitehall" ? "24 min" : "15 min"}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-1">Driving Time</div>
            <div className="text-lg font-bold">
              {property === "514-whitehall" ? "4 min" : "2 min"}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-1">Forge Atlanta</div>
            <div className="text-lg font-bold">
              {property === "514-whitehall" ? "0.5 mi" : "0.3 mi"}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
