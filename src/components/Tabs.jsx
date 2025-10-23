export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "about", label: "About Me" },
    { id: "experiences", label: "Experiences" },
    { id: "recommended", label: "Recommended" },
  ];

  return (
    <div className="flex gap-1.5 md:gap-2 mb-0 bg-gray-900 rounded-2xl p-1.5 overflow-hidden">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 min-w-0 truncate px-2 sm:px-3 md:px-4 py-2 md:py-2.5 
            rounded-xl text-[11px] sm:text-xs md:text-sm font-medium transition-all transform 
            ${activeTab === tab.id
              ? "bg-gray-800 text-white shadow-[0_4px_10px_rgba(255,255,255,0.3)] hover:-translate-y-1"
              : "text-gray-400 hover:text-gray-200 hover:-translate-y-1 hover:shadow-[0_4px_10px_rgba(255,255,255,0.2)]"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
