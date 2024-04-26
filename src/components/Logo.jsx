import React from "react";

function Logo() {
  return (
    <div className="w-24 flex flex-col items-center justify-center">
      <div
        className={`rounded-full border-2 border-sky-200 w-16 h-16 text-white items-center text-4xl font-extrabold flex`}
      >
        <p className="translate-x-1">R</p>
        <p className="-translate-x-1">W</p>
      </div>
      <div className="font-extrabold text-sky-200">Rapid Write</div>
    </div>
  );
}

export default Logo;
