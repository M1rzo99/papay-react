import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { Statistics } from "./statistics";
import { TopRestaurants } from "./topRestaurants";
import { BestRestaurants } from "./bestRestaurants";
import { BestDishes } from "./bestDishes";
import { Advertisements } from "./advertisements";
import { Events } from "./events";
import { Recommindations } from "./recommindations";
import "../../../css/home.css";

export function HomePage() {
  useEffect(() => {
    console.log("componenetDidMount = Malumotlarni olish");

    return () => {
      console.log("componenetWillMount process");
    };
  }, []); // componenet birinchi mount bolganda ishga tushadi

  return (
    <div className="homepage">
      <Statistics />
      <TopRestaurants />
      <BestRestaurants />
      <BestDishes />
      <Advertisements />
      <Events />
      <Recommindations />
    </div>
  );
}
