import React from 'react';

const Hero = () => {
  return (
    <div className="flex-1">
      <div
        className="w-full min-h-[710px] md:min-h-[710px] bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.png')" }}
        role="img"
        aria-label="Hero background"
      ></div>
    </div>
  );
};

export default Hero;
