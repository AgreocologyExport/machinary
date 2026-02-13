import { motion } from "motion/react";
import { useState, useEffect, createElement } from "react";
import { Target, Eye, Heart, Users, Award, TrendingUp } from "lucide-react";
import { getAboutData, defaultAboutData, type AboutData } from "../data/aboutData";

export function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutData>(defaultAboutData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        const dataPromise = getAboutData();
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Fetch timeout')), 3000)
        );

        const data = await Promise.race([dataPromise, timeoutPromise]) as AboutData;
        setAboutData(data);
      } catch (error) {
        console.warn('About data fetch slow/failed:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAboutData();
  }, []);

  // Removed blocking loading screen
  const valueIcons = [Target, Eye, Heart];
  const teamIcons = [Users, TrendingUp, Award, Users];


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#043F43] to-[#043F43]/90 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-white mb-6">{aboutData.heroTitle}</h1>
            <p className="text-white/80 text-xl max-w-3xl mx-auto">
              {aboutData.heroDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-[#043F43] mb-6">{aboutData.storyTitle}</h2>
              <div className="w-16 h-1 bg-[#07D185] mb-8 rounded-full" />
              <p className="text-[#043F43] mb-6">
                {aboutData.storyParagraph1}
              </p>
              <p className="text-[#043F43] mb-6 opacity-80">
                {aboutData.storyParagraph2}
              </p>
              <p className="text-[#043F43] opacity-80">
                {aboutData.storyParagraph3}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="bg-gradient-to-br from-[#07D185]/10 to-[#043F43]/10 rounded-3xl p-8 text-center">
                <div className="text-4xl text-[#07D185] mb-2">{aboutData.stats.yearsExperience}</div>
                <div className="text-[#043F43] opacity-70">Years Experience</div>
              </div>
              <div className="bg-gradient-to-br from-[#07D185]/10 to-[#043F43]/10 rounded-3xl p-8 text-center">
                <div className="text-4xl text-[#07D185] mb-2">{aboutData.stats.countriesServed}</div>
                <div className="text-[#043F43] opacity-70">Countries Served</div>
              </div>
              <div className="bg-gradient-to-br from-[#07D185]/10 to-[#043F43]/10 rounded-3xl p-8 text-center">
                <div className="text-4xl text-[#07D185] mb-2">{aboutData.stats.globalPartners}</div>
                <div className="text-[#043F43] opacity-70">Global Partners</div>
              </div>
              <div className="bg-gradient-to-br from-[#07D185]/10 to-[#043F43]/10 rounded-3xl p-8 text-center">
                <div className="text-4xl text-[#07D185] mb-2">{aboutData.stats.tonsExported}</div>
                <div className="text-[#043F43] opacity-70">Tons Exported</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-24 bg-gradient-to-b from-white to-[#07D185]/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-[#043F43] mb-6">Mission, Vision & Values</h2>
            <div className="w-16 h-1 bg-[#07D185] mx-auto mb-8 rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {aboutData.values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#07D185] to-[#07D185]/80 flex items-center justify-center mb-6 shadow-lg">
                  {createElement(valueIcons[index % valueIcons.length], { className: "w-8 h-8 text-white" })}
                </div>
                <h3 className="text-[#043F43] mb-4">{value.title}</h3>
                <p className="text-[#043F43] opacity-70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-[#043F43] mb-6">{aboutData.exportProcessTitle}</h2>
            <div className="w-16 h-1 bg-[#07D185] mx-auto mb-8 rounded-full" />
            <p className="text-[#043F43] opacity-80 max-w-2xl mx-auto">
              {aboutData.exportProcessDescription}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutData.process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-white to-[#07D185]/5 border border-[#07D185]/10 rounded-2xl p-6 hover:shadow-lg transition-all duration-500">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#07D185] flex items-center justify-center text-white flex-shrink-0">
                      {item.step}
                    </div>
                    <h4 className="text-[#043F43]">{item.title}</h4>
                  </div>
                  <p className="text-[#043F43] opacity-70">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-gradient-to-b from-[#07D185]/5 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-[#043F43] mb-6">Leadership Team</h2>
            <div className="w-16 h-1 bg-[#07D185] mx-auto mb-8 rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutData.team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >


                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#07D185]/20 to-[#043F43]/20 flex items-center justify-center">
                  {createElement(teamIcons[index % teamIcons.length], { className: "w-16 h-16 text-[#07D185]" })}
                </div>
                <h4 className="text-[#043F43] mb-2">{member.name}</h4>
                <p className="text-[#043F43] opacity-70">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[#043F43] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6">Our Journey</h2>
            <div className="w-16 h-1 bg-[#07D185] mx-auto mb-8 rounded-full" />
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#07D185]/30 hidden lg:block" />

            <div className="space-y-12">
              {aboutData.timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    } flex-col lg:flex-row`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"} text-center lg:text-left`}>
                    <div className="text-[#07D185] text-3xl mb-2">{item.year}</div>
                    <h4 className="text-white mb-2">{item.event}</h4>
                    <p className="text-white/70">{item.description}</p>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-[#07D185] border-4 border-[#043F43] z-10" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-[#043F43] mb-6">{aboutData.sustainabilityTitle}</h2>
              <div className="w-16 h-1 bg-[#07D185] mb-8 rounded-full" />
              <p className="text-[#043F43] mb-6">
                {aboutData.sustainabilityDescription}
              </p>
              <ul className="space-y-4">
                {aboutData.sustainabilityPoints.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#07D185]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#07D185]" />
                    </div>
                    <span className="text-[#043F43] opacity-80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-[#07D185]/10 to-[#043F43]/10 rounded-3xl p-12"
            >
              <div className="space-y-8">
                <div className="text-center">
                  <div className="text-5xl text-[#07D185] mb-2">{aboutData.sustainabilityStats.traceableSupplyChain}</div>
                  <div className="text-[#043F43] opacity-70">Traceable Supply Chain</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl text-[#07D185] mb-2">{aboutData.sustainabilityStats.organicCertified}</div>
                  <div className="text-[#043F43] opacity-70">Organic Certified Products</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl text-[#07D185] mb-2">{aboutData.sustainabilityStats.partnerFarmers}</div>
                  <div className="text-[#043F43] opacity-70">Partner Farmers</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
