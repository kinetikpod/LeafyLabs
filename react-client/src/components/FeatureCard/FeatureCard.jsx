import { CheckCircle } from 'lucide-react';
import { Link } from "react-router-dom"

const FeatureCard = ({
  title,
  subtitle,
  subtitleColor,
  icon,
  iconColor,
  borderColor,
  buttonColor,
  buttonHoverColor,
  features,
  targetPath = "#",
  id,
}) => {
  return (
    <div
      className={`relative w-[380px] h-[360px] rounded-3xl bg-gradient-to-br from-gray-100 to-white p-8
      border shadow-md transition-all duration-500 transform
      hover:shadow-xl hover:scale-[1.03]
      group overflow-visible ${borderColor}`}
      id={id}
    >

      {/* overlay jika terkunci */}
      {/* {locked && ( */}
      {/*   <div className="absolute inset-0 bg-white bg-opacity-70 z-10 rounded-3xl flex items-center justify-center"> */}
      {/*     <span className="text-gray-700 font-medium">Login untuk akses</span> */}
      {/*   </div> */}
      {/* )} */}

      <div className={`absolute top-4 right-4 text-2xl ${iconColor}`}>
        {icon}
      </div>

      <div className="grid place-content-center h-full gap-4 text-black text-sm text-center">
        <p className="text-3xl font-extrabold">{title}</p>
        <p className={`font-bold mb-3 text-lg italic ${subtitleColor}`}>
          {subtitle}
        </p>

        <ul className="text-gray-700 text-sm space-y-3 text-left">
          {features.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-base">{item}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Link to={targetPath}>
        <button
          className={`absolute cursor-pointer font-bold left-1/2 bottom-0 transform -translate-x-1/2 translate-y-[125%] opacity-0 group-hover:translate-y-1/2 group-hover:opacity-100 transition-all duration-300 ${buttonColor} hover:${buttonHoverColor} text-white px-5 py-2.5 rounded-xl text-sm shadow-lg`}
        >
          Go
        </button>

      </Link>
    </div>
  );
};

export default FeatureCard;

