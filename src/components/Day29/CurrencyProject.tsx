import React from "react";
import UseCurrencyInfo from "./UseCurrencyInfo";

function CurrencyProject() {
  return (
    <div className="min-h-screen w-full relative">
      {/* Emerald Void */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #000000 40%, #072607 100%)",
        }}
      />
    <UseCurrencyInfo/>
    </div>
  );
}

export default CurrencyProject;
