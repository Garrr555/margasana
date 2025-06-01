"use client";

import AdminLayout from "@/components/layouts/AdminLayout";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { useState } from "react";
import Button from "@/components/ui/button";
import { usePopulationStats } from "@/hook/demografi";

export default function StatAdminView() {
  const {
    totalPopulation,
    menCount,
    womenCount,
    averageAge,
    populationDensity,
    growthRate,
  } = usePopulationStats();


  return (
    <div className="flex flex-col justify-center items-start gap-5">
     
    </div>
  );
}
