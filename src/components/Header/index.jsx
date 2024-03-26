import useFullScreenStore from "../../store/useFullScreen";
import w2mLogo from "../../assets/w2mLogo.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const { isFullScreen } = useFullScreenStore();
  const navigate = useNavigate();

  if (isFullScreen) {
    return null;
  }

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center mt-8 mb-8">
      <button onClick={handleNavigateHome}>
        <img
          src={w2mLogo}
          alt="W2M Logo"
          className="w-20 h-20 mr-6 sm:w-20 sm:h-20"
        />
      </button>
      <h1 className="text-4xl font-bold sm:text-4xl md:text-4xl lg:text-6xl">
        W2M
      </h1>
    </div>
  );
}

export default Header;
