import { authRoutes, expesnsesRoutes } from "@/data/routePaths";
import { Show, UserButton } from "@clerk/react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="bg-green-200 h-(--nav-height) py-2">
      <nav className="xl:max-w-7xl max-w-[calc(100%-30px)]  mx-auto flex  justify-between">
        <Link
          to={expesnsesRoutes.list}
          className="text-light-gray md:text-xl text-lg"
        >
          Expenses Tracker
        </Link>

        <div>
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

              <li className="md:flex hidden">
                <UserButton signInUrl={authRoutes.login} />
              </li>
            </ul>
          </Show>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
