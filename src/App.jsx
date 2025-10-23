import React from "react";
import AboutWidget from "./components/AboutMeWidget.jsx";
import GalleryWidget from "./components/GalleryWidget.jsx";

function App() {
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 flex items-center justify-center">
      <div className="w-full max-w-[1400px] grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <div className="hidden md:block"></div>
        <div className="space-y-6 w-full max-w-[700px] md:max-w-[750px] lg:max-w-none mx-auto">
          <AboutWidget />
          <GalleryWidget />
        </div>
      </div>
    </div>
  );
}

export default App;
