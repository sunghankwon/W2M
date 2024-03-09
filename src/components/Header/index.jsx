import w2mLogo from "../../assets/w2mLogo.png";

function Header() {
  return (
    <div className="flex items-center justify-center mt-8 mb-10">
      <img
        src={w2mLogo}
        alt="W2M Logo"
        className="w-24 h-24 sm:w-28 sm:h-28 mr-6"
      />
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
        W2M
      </h1>
    </div>
  );
}

export default Header;
