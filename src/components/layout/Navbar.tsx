import { authRoutes, expesnsesRoutes } from "@/data/routePaths";
import { Show, UserButton } from "@clerk/react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="bg-green-200 h-(--nav-height) py-2">
      <nav className="max-w-7xl mx-auto flex  justify-between">
        <Link to={expesnsesRoutes.list} className="text-light-gray text-xl">
          Expenses Tracker
        </Link>

        <Show when="signed-out">
          <ul className="flex items-center gap-2.5">
            <li>
              <Link to={authRoutes.login} className="navlink">
                Log In
              </Link>
            </li>

            <li>
              <Link to={authRoutes.register} className="navlink">
                Register
              </Link>
            </li>
          </ul>
        </Show>
        <Show when="signed-in">
          <ul className="flex gap-2.5">
            <li>
              <Link to={expesnsesRoutes.list} className="navlink">
                Expenses
              </Link>
            </li>
            <li>
              <Link to={expesnsesRoutes.addNew} className="navlink">
                Add New
              </Link>
            </li>

            <li>
              <UserButton signInUrl={authRoutes.login} />
            </li>
          </ul>
        </Show>
      </nav>
    </header>
  );
};

export default Navbar;
