import { useState, useEffect } from "react";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Products } from "../components/Products";
import { TrustedCompanies } from "../components/TrustedCompanies";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { Certifications } from "../components/Certifications";
import { ExportMap } from "../components/ExportMap";
import { getHomeData, defaultHomeData, type HomeData } from "../data/homeData";

interface HomePageProps {
  onNavigate: (page: string, id?: any) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [homeData, setHomeData] = useState<HomeData>(defaultHomeData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        // Race the fetch against a 3s timeout to ensure page doesn't hang
        const dataPromise = getHomeData();
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Fetch timeout')), 3000)
        );

        const data = await Promise.race([dataPromise, timeoutPromise]) as HomeData;
        setHomeData(data);
      } catch (error) {
        console.warn('Home data fetch slow/failed, using defaults or cache:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  // Removed blocking loading screen for instant feel
  // The page will render immediately with defaultHomeData and update if Firestore responds

  return (
    <>
      <Hero
        onNavigate={onNavigate}
        title={homeData?.heroTitle}
        subtitle={homeData?.heroSubtitle}
        backgroundImage={homeData?.heroBackgroundImage}
      />
      <About
        title={homeData?.aboutTitle}
        description1={homeData?.aboutDescription1}
        description2={homeData?.aboutDescription2}
        values={homeData?.aboutValues}
      />
      <Products onNavigate={onNavigate} />
      <TrustedCompanies />
      <WhyChooseUs
        title={homeData?.whyChooseUsTitle}
        description={homeData?.whyChooseUsDescription}
        features={homeData?.whyChooseUsFeatures}
        stats={homeData?.whyChooseUsStats}
      />
      <Certifications
        title={homeData?.certificationsTitle}
        description={homeData?.certificationsDescription}
        list={homeData?.certificationsList}
      />
      <ExportMap />
    </>
  );
}
