"use client";
import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

const GoBackBtn = () => {
  return (
    <Button className="w-30" onClick={() => window.history.back()}>
      <ArrowLeft className="w-4 h-4" />
      Go Back
    </Button>
  );
};

export default GoBackBtn;
