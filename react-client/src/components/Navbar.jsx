import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Navbar = ({ authUser }) => {
  return (
    <nav className="navbar flex justify-around bg-base-100 shadow-md px-4">
      <div className="">
        <Link to="/" className="text-3xl font-bold text-green-500">
          LeafyLabs
        </Link>
      </div>

      <div className="flex gap-4">
        <HashLink smooth to="/#statCard" className="btn hover:text-green-500 btn-ghost text-lg">
          Statistic
        </HashLink>
        <HashLink smooth to="/#mlCard" className="btn btn-ghost text-lg hover:text-green-500">
          Machine Learning
        </HashLink>
        <HashLink smooth to="/#aiCard" className="btn btn-ghost text-lg hover:text-green-500">
          AI Tools
        </HashLink>
      </div>

      {authUser ? <span className="text-lg font-bold">{authUser.name}</span> : (<Link to="/login">
        <button className="btn btn-primary rounded-md">login</button>
      </Link>)}
    </nav>
  );
};

export default Navbar;

