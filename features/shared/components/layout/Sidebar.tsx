import SliderContent from "./SliderContent";

export function Sidebar() {
  return (
    <div className="fixed hidden md:flex flex-col w-64 h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
      <SliderContent />
    </div>
  );
}
