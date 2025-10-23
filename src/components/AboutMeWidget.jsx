import { useState, useRef } from "react";
import { HelpCircle } from "lucide-react";
import Tabs from "./Tabs";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutMeWidget() {
  const [activeTab, setActiveTab] = useState("about");
  const scrollRef = useRef(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  const tabContent = {
    about: `Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.

I was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years with my wife Tiffany and my 4 year old twin daughters- Emma and Ella. Both of them are just starting school, so my calendar is usually blocked between 9-10 AM. This is a long text to demonstrate internal scrolling. Keep adding more text so it overflows and scrolls within this area.`,
    experiences: `Throughout my career at Salesforce, I've worked with hundreds of clients across various industries. I specialize in enterprise solutions and have helped companies increase their sales efficiency by up to 300%.

My approach focuses on understanding client needs and delivering tailored solutions that drive real business value.`,
    recommended: `I highly recommend exploring our latest CRM features and automation tools. These have been game-changers for our clients in Q4.

Feel free to reach out if you'd like to discuss how these solutions can benefit your organization.`,
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      setScrollPercent(scrollTop / (scrollHeight - clientHeight));
    }
  };

  return (
    <div
      className="bg-linear-to-br from-gray-700 to-gray-800 rounded-3xl p-4 md:p-6 shadow-2xl flex flex-col relative w-full max-w-full"
      style={{ height: "300px" }}
    >
      {/* Help icon + Tabs */}
      <div className="flex items-center gap-4 mb-3 md:mb-4 shrink-0">
        <button className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500 transition-colors shrink-0">
          <HelpCircle className="w-4 h-4 text-gray-300" />
        </button>
        <div className="flex-1">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="overflow-y-auto flex-1 scrollbar-hide px-2 md:px-4 py-1"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm md:text-base">
              {tabContent[activeTab]}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modern scroll indicator */}
      <div className="absolute top-1/2 right-2 w-1 h-[50px] -translate-y-1/2 flex items-start">
        <div
          className="bg-linear-to-br from-gray-600 via-gray-400 to-gray-200
 rounded-full w-full transition-all"
          style={{
            height: `${Math.max(
              scrollRef.current
                ? (scrollRef.current.clientHeight /
                  scrollRef.current.scrollHeight) *
                100
                : 0,
              15
            )
              }%`,
            transform: `translateY(${scrollPercent *
              (100 -
                Math.max(
                  scrollRef.current
                    ? (scrollRef.current.clientHeight /
                      scrollRef.current.scrollHeight) *
                    100
                    : 0,
                  15
                ))
              }%)`,
          }}
        />
      </div>
    </div>
  );
}
