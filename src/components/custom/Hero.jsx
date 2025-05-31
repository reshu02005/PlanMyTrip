import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ListChecks,
  MessageCircleHeart,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function Hero({ onSeeHowItWorks }) {
  return (
    <div className="flex flex-col items-center text-center pt-24 md:pt-32 pb-24">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
        Plan Your Perfect Trip with <span className="text-primary">AI</span>
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-10">
        Let our AI create personalized travel itineraries based on your
        preferences, budget, and schedule.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
        <Link to="/create-trip">
          <Button size="lg" className="gap-2">
            Plan My Trip <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
        <Button size="lg" variant="outline" onClick={onSeeHowItWorks}>
          See How It Works
        </Button>
        <Link to="/checklist">
          <Button size="lg" variant="secondary" className="gap-2">
            Packing Checklist <ListChecks className="h-4 w-4" />
          </Button>
        </Link>
        <Link to="/feedback">
          <Button size="lg" variant="ghost" className="gap-2">
            Feedback <MessageCircleHeart className="h-4 w-4" />
          </Button>
        </Link>
        {/* New Button to Connect With Others */}
        <Link to="/all-users">
          <Button size="lg" variant="default" className="gap-2">
            Connect With Others <Users className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="mt-16 relative w-full max-w-4xl">
        <div className="rounded-lg overflow-hidden shadow-2xl border">
          <img
            src="/placeholder.svg"
            alt="PlanItAI interface preview"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
