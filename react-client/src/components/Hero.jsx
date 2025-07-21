import dataHero from "../assets/data_hero.svg"

const Hero = () => {
  const handleGetStarted = () => {
    const target = document.getElementById('appcard');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 py-6 bg-white">

      {/* Bagian Kiri */}
      <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-snug">
          Upload your CSV and now you're <span className="text-green-500">95%</span> confident you're a <span className="text-amber-500">data scientist</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-xl">
          We pick the right test, plot the vibe, and explain it all — no stress, just smart stuff (with a dash of SHAP).
        </p>
        <div className="flex justify-end"> <button onClick={handleGetStarted} className="btn btn-dash btn-primary mt-4">Get Started</button>  </div>
      </div>

      {/* Bagian Kanan */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          src={dataHero}
          alt="Data Visualization Illustration"
          className="max-w-full h-auto max-h-[400px] object-contain"
        />
      </div>

    </section>
  );
};



export default Hero;
