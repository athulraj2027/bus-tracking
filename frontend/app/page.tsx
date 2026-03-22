import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import Search from "@/components/landing/Search";

export default function Home() {
  return (
    <div className="min-h-screen ">
      <Hero />
      <Search />
      <Features />
    </div>
  );
}
