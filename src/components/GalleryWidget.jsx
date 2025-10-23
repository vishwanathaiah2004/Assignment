import { ChevronLeft, ChevronRight, Plus, HelpCircle } from "lucide-react";
import { useState, useRef } from "react";

export default function GalleryWidget() {
  const [images, setImages] = useState([
    "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1198817/pexels-photo-1198817.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/248616/pexels-photo-248616.jpeg?auto=compress&cs=tinysrgb&w=800",
  ]);

  const scrollRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImages((prev) => [...prev, url]);
      // scroll to end after image added
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            left: scrollRef.current.scrollWidth,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  };

  // scroll one card width
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const firstCard = scrollRef.current.querySelector("[data-gallery-card]");
    if (!firstCard) return;
    const gap = 12; // matches gap-3 (12px)
    const cardWidth = firstCard.clientWidth;
    const scrollAmount = cardWidth + gap;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-linear-to-br from-gray-700 to-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col overflow-visible relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        {/* left: help + label */}
        <div className="flex items-center gap-3 shrink-0">
          <button className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500 transition-colors shrink-0">
            <HelpCircle className="w-4 h-4 text-gray-300" />
          </button>

          <div className="bg-gray-900 rounded-2xl px-4 md:px-6 py-2">
            <span className="text-white font-medium text-sm">Gallery</span>
          </div>
        </div>

        {/* right: add image + arrows */}
        <div className="flex items-center gap-2 flex-wrap">
          <label
            className="
    bg-linear-to-br from-gray-700 to-gray-500
    border border-gray-600/40 rounded-full px-4 md:px-5 py-2.5
    flex items-center gap-2 shadow-md
    transition-all transform hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.5)]
    text-white text-xs font-medium cursor-pointer ">
            <Plus className="w-4 h-4" />
            ADD IMAGE
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>


          {images.length > 0 && (
            <div className="flex gap-2">
              <button
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shadow-md transition-all  cursor-pointer
                 transform hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(255,255,255,0.5)] hover:bg-gray-500 active:translate-y-0.5"
                onClick={() => scroll("left")}
                aria-label="scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-gray-400" />
              </button>

              <button
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shadow-md transition-all transform hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(255,255,255,0.5)]
                 cursor-pointer hover:bg-gray-500 active:translate-y-0.5"
                onClick={() => scroll("right")}
                aria-label="scroll right"
              >
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Gallery row: perspective + no clipping */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide relative z-0"
        style={{ perspective: "1000px" }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            data-gallery-card
            className="flex-none w-full sm:w-1/2 md:w-1/3 h-48 md:h-40 rounded-2xl perspective-1000 group"
          >
            {/* card wrapper: the whole card is what pops out */}
            <div
              className="relative w-full h-full rounded-2xl overflow-visible"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className={
                  "absolute inset-0 rounded-2xl overflow-hidden shadow-xl transition-all duration-500 transform-gpu " +
                  "bg-gray-900 group-hover:-translate-y-4 group-hover:scale-105 group-hover:z-50 " +
                  "group-hover:rotate-x-6 group-hover:rotate-y-3 group-hover:shadow-[0_25px_60px_rgba(255,255,255,0.45)]"
                }
              >
                <img
                  src={img}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-6 h-1 bg-gray-600 rounded-full overflow-hidden">
        <div className="h-full w-1/3 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  );
}
