import useFullScreenStore from "../../store/useFullScreen";
import w2mLogo from "../../assets/w2mLogo.png";
import { useNavigate } from "react-router-dom";

const Header = (): JSX.Element | null => {
  const { isFullScreen } = useFullScreenStore();
  const navigate = useNavigate();

  if (isFullScreen) {
    return null;
  }

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center mt-8 mb-4">
      <button onClick={handleNavigateHome}>
        <img
          src={w2mLogo}
          alt="W2M Logo"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
        />
      </button>
      <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
        W2M
      </h1>
    </div>
  );
};

export default Header;
