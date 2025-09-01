"use client";
import type React from "react";
import LightRays from "@/components/ui/LightRays/LightRays";

const Background = ({ children }: { children: React.ReactNode }) => {
  return <LightRays>{children}</LightRays>;
};

export default Background;
