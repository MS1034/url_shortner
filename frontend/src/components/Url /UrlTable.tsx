type TabNavProps = {
    selectedTab: string;
    setSelectedTab: (tab: string) => void;
  };
  
  const TabNav = ({ selectedTab, setSelectedTab }: TabNavProps) => (
    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark flex">
      {["quick", "advance", "pregenerate"].map((tab) => (
        <button
          key={tab}
          className={`flex-1 py-4 text-sm font-medium hover:text-primary md:text-base ${
            selectedTab === tab
              ? "border-b-2 border-primary text-primary"
              : "border-b-2 border-transparent"
          }`}
          onClick={() => setSelectedTab(tab)}
        >
          {tab.charAt(0).toUpperCase() +
            tab.slice(1).replace("generate", " Generate")}
        </button>
      ))}
    </div>
  );
  
  export default TabNav;
  