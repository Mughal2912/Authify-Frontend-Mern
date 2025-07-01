// src/components/HeroBackground.jsx
const HeroBackground = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary via-primaryLight to-accent/20">
      <div className="max-w-[1200px] mx-auto px-4">{children}</div>
    </div>
  );
};

export default HeroBackground;
