import { features } from "@/constants/landing";
import React from "react";

const Features = () => {
  return (
    <section id="features" className="px-6 py-20 max-w-6xl mx-auto">
      {/* Heading (optional but very YC style) */}
      <div className="mb-12 max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-primary tracking-tight">
          Built for real-time tracking
        </h2>
        <p className="text-muted-foreground mt-3 text-sm md:text-base">
          Designed with scalability and performance in mind using modern system
          architecture.
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="border border-border bg-card p-6 rounded-lg hover:bg-muted/50 transition"
          >
            <h3 className="text-base font-medium tracking-tight text-primary">
              {feature.title}
            </h3>

            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
