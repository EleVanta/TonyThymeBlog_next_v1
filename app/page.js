import LandingPage from "./components/LandingPage.js";
import { getTour } from "@/lib/getRecipes.js";
import { sampleTour } from '@/lib/sampleData';
import Recipes from "./recipes/page.js";

export default async function Home() {
  const res = await getTour();
  const tourCollection = res?.tourCollection ?? sampleTour.tourCollection;
  return (
    <main className="flex m-0">
      {tourCollection?.items?.length ? <LandingPage data={res} /> : <Recipes />}
    </main>
  );
}
