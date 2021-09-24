import NavBar from "./NavBar";
import NavBarMobile from "./NavBarMobile";

function Header() {
  const links = [
    { label: "ABOUT", to: "about" },
    { label: "GALLERY", to: "gallery" },
    { label: "WHO WE ARE", to: "whoweare" },
  ];

  return (
    <div className="items-center justify-between p-5 sticky top-0 flex bg-black">
      <a href={"/"}>
        <img
          src="https://bandwagonfanclub.com/static/bw_logo_white-56abe4510478fa17e38a71bb458a3ece.png"
          alt="Bandwagon"
          className="max-w-1/2 sm:max-w-xs sm:py-6 md:p-0"
        />
      </a>
      <div className="hidden md:flex items-center">
        <NavBar links={links} />
      </div>
      <div className="flex md:hidden">
        <NavBarMobile links={links} />
      </div>
    </div>
  );
}

export default Header;
