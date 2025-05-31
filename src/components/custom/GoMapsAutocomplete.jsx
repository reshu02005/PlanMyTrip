import React, { useState } from 'react';
import { Input } from "@/components/ui/input";  // Assuming you're using the same Input component
import { ChevronDown } from "lucide-react";

function GoMapsAutocomplete({ apiKey, value, onSelectPlace }) {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);

  // Fetch place suggestions based on user input
  const handleInputChange = async (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);

    if (inputValue.length > 1) {
      try {
        const response = await fetch(
          `https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=${inputValue}&key=${apiKey}`
        );
        const data = await response.json();

        if (data.predictions) {
          setSuggestions(data.predictions);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching autocomplete results:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Handle the selection of a place
  const handleSelectPlace = (place) => {
    setQuery(place.description);
    setSuggestions([]);
    if (onSelectPlace) {
      onSelectPlace(place);
    }
  };

  return (
    <div className="relative w-full">
      <Input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a place..."
        className="border p-2 w-full rounded pr-10"
      />
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />

      {/* Display Suggestions Below Input */}
      {suggestions.length > 0 && (
        <div className="absolute w-full bg-white border rounded shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
          {suggestions.map((place, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectPlace(place)}
            >
              {place.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GoMapsAutocomplete;
