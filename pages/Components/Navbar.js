import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="trc.png" alt="LogoTRC" width="60" height="48" className="LogoTRC d-inline-block align-text-top"></img>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li
              className={`nav-item ${router.pathname === "/" ? "active" : ""}`}
            >
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li
              className={`nav-item ${
                router.pathname === "/CrearCuestionario" ? "active" : ""
              }`}
            >
            </li>
            <li
              className={`nav-item ${
                router.pathname === "/Cuestionarios" ? "active" : ""
              }`}
            >
              <Link className="nav-link" href="/Cuestionarios">
                Cuestionarios
              </Link>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
