import { CheckCircle, BarChart3 } from 'lucide-react';

const FeatureCard = () => {
  return (
    <div className="relative w-[300px] h-[360px] rounded-3xl bg-gradient-to-br from-gray-100 to-white p-8 border border-gray-300 shadow-md hover:shadow-xl hover:border-blue-500 transition-all duration-500 group transform hover:scale-[1.03] overflow-visible mb-10">
      <div className="absolute top-4 right-4 text-blue-400 text-2xl">
        <BarChart3 className="w-8 h-8" />
      </div>

      <div className="grid place-content-center h-full gap-4 text-black text-sm text-center">
        <p className="text-3xl font-extrabold">Statistics</p>
        <p className="text-amber-500 font-bold mb-3 text-sm italic">automated for speed</p>

        <ul className="text-gray-700 text-sm space-y-3 text-left">
          <li className="flex items-start gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-base">Two-group test</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-base">More than two groups</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-base">Chi-square test</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-base">...and more</span>
            </div>
          </li>
        </ul>
      </div>

      <button className="absolute font-bold left-1/2 bottom-0 transform -translate-x-1/2 translate-y-[125%] opacity-0 group-hover:translate-y-1/2 group-hover:opacity-100 transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm shadow-lg">
        Go
      </button>
    </div>
  );
};





export default FeatureCard
