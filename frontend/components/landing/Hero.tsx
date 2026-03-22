import React from "react";

const Hero = ({
  title = "Track buses in real-time with precision",
  subtitle = "A scalable, real-time bus tracking platform powered by microservices, live location streaming, and modern system design.",
  primaryText = "Start Tracking",
  primaryLink = "/register",
  secondaryText = "Learn More",
  secondaryLink = "#features",
}) => {
  return (
    <section className="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center text-center px-6">
      <h2 className="text-4xl text-primary md:text-5xl font-extrabold max-w-3xl leading-tight tracking-tight">
        {title}
      </h2>

      <p className="mt-6 text-muted-foreground max-w-xl text-base md:text-md">
        {subtitle}
      </p>

      <div className="mt-8 flex gap-4">
        <a
          href={primaryLink}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:opacity-90 transition"
        >
          {primaryText}
        </a>

        <a
          href={secondaryLink}
          className="border border-border px-6 py-3 rounded-md text-muted-foreground hover:text-foreground transition"
        >
          {secondaryText}
        </a>
      </div>
    </section>
  );
};

export default Hero;
