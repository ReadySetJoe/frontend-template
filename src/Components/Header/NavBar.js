import { useLocation, Link as RouterLink } from "react-router-dom";
import { Link } from "react-scroll";
import ConnectWallet from "./ConnectWallet";

function NavBar(props) {
  const match = useLocation();

  return (
    <>
      {match.pathname === "/" ? (
        props.links.map((link, i) => (
          <div key={i} className="m-3 p-2 hover:text-gray-300 cursor-pointer">
            <Link
              to={link.to}
              activeClass="active"
              spy={true}
              smooth={true}
              offset={-100}
            >
              {link.label}
            </Link>
          </div>
        ))
      ) : (
        <div className="m-3 p-2 hover:text-gray-300 cursor-pointer">
          <RouterLink to={"/"}>BACK TO COLLECTION</RouterLink>
        </div>
      )}

      <ConnectWallet />
    </>
  );
}

export default NavBar;
