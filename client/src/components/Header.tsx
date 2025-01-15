import Logo from "../assets/Logo.png";

const Header = () => {
  return (
    <header className="flex justify-center items-center px-8 py-6 bg-neutral-900 shadow-md">
      <div className="text-2xl font-bold flex justify-center gap-6 items-center text-neutral-50 tracking-wide">
        <img className="w-14" src={Logo} alt="MomentumLogo" />
        <span> Momentum</span>
      </div>
    </header>
  );
};

export default Header;
