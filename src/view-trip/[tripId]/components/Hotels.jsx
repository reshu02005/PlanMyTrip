import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, ExternalLink } from "lucide-react";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-5">Hotel Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <Link
            to={
              "https://www.google.com/maps/search/?api=1&query=" +
              hotel?.hotelName +
              "," +
              hotel?.address
            }
            target="_blank"
          >
            <Card
              key={index}
              className="overflow-hidden flex flex-col h-full hover:scale-105 transition-all cursor-pointer"
            >
              <div className="relative h-48">
                <img
                  src={hotel?.imageURL || "/placeholder.svg"}
                  alt={hotel?.hotelName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1 text-sm font-medium">
                  ${hotel?.pricePerNight}/night
                </div>
              </div>
              <CardContent className="pt-6 flex flex-col justify-between flex-grow">
                <h3 className="font-bold text-lg mb-1">{hotel?.hotelName}</h3>
                <div className="flex items-center gap-1 mb-2">
                  {/* Use Material UI Rating component */}
                  <Rating
                    value={hotel?.rating}
                    precision={0.5} // To allow half-stars
                    readOnly
                    size="small"
                    className="text-primary"
                  />
                  <span className="text-sm text-muted-foreground ms-2">
                    {hotel?.rating}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-5 w-5" />
                  <span>{hotel?.address}</span>
                </div>
                <Separator className="my-3" />
                <Button className="w-full gap-2" size="sm">
                  Book Now <ExternalLink className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
