// FolderFloatButton.jsx
export default function FolderFloatButton({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        flex flex-col items-center justify-center
        p-5 bg-gradient-to-tr from-green-300 to-green-600
        rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.2)]
        w-fit mt-20 cursor-pointer
      "
    >
      {/* ikon folder floating */}
      <div
        className="relative transition-transform duration-300 ease-in-out hover:scale-105"
        style={{ animation: 'float 2.5s infinite ease-in-out' }}
      >
        <div className="bg-gradient-to-tr from-orange-400 to-red-500 w-20 h-5 rounded-t-lg shadow-[0_5px_15px_rgba(0,0,0,0.2)] relative z-10" />
        <div className="bg-gradient-to-tr from-yellow-300 to-yellow-500 w-[120px] h-[80px] rounded-br-lg rounded-bl-lg rounded-tr-none shadow-[0_15px_30px_rgba(0,0,0,0.3)] relative -top-2" />
      </div>

      {/* tetap tampilkan teks ini */}
      <div
        className="
          mt-5 inline-block w-[220px] text-white text-lg text-center
          py-[15px] px-[25px] bg-white/20 rounded-lg
          shadow-[0_10px_20px_rgba(0,0,0,0.1)]
          transition-colors duration-300 hover:bg-white/40
        "
      >
        Choose a file
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}

