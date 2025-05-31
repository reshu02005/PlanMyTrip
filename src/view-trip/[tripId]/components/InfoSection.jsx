import { IoShareSocialOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import React from "react";
import { Button } from "@/components/ui/button";

function InfoSection({ trip }) {
  return (
    <div>
      <img
        src="/placeholder.svg"
        className="h-[300px] w-full object-cover rounded-xl"
      />
      <div className="my-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="my-5 flex flex-col gap-2 text-sm">
          <h1 className="text-3xl md:text-4xl font-bold">
            Your Trip to {trip?.userSelection?.location}
          </h1>
          <div className="mt-2 flex flex-wrap gap-3">
            <h2 className="p-2 bg-primary rounded-full text-primary-foreground">
              📅 {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-2 bg-primary rounded-full text-primary-foreground">
              👥 No. of Traveler: {trip?.userSelection?.traveler}
            </h2>
            <h2 className="p-2 bg-primary rounded-full text-primary-foreground">
              💰 {trip?.userSelection?.budget} Budget :{" "}
              {trip?.userSelection?.moneyPerDay} per day
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="border-1 mt-4 md:mt-0">
            <IoShareSocialOutline /> Share
          </Button>
          <Button variant="ghost" size="sm" className="border-1 mt-4 md:mt-0">
            <MdOutlineFileDownload />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
