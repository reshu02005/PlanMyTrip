import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "./components/InfoSection";
import Hotels from "./components/Hotels";

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  // Fetch trip information from Firebase using the tripId

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No Such Document");
      toast("No trip Found!");
    }
  };

  return (
    <div className="p-5 md:px-10 lg:px-20 xl:px-30">
      {/* Information Section */}
      <InfoSection trip={trip} />

      {/* Hotel Recommendations */}
      <Hotels trip={trip} />

      {/* Day-by-Day Itinerary */}
      
      {/* Note */}
    </div>
  );
}

export default Viewtrip;
