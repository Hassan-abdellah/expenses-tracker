import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="bg-green-200 h-(--nav-height) py-2">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/expenses" className="text-light-gray text-xl">
          Expenses Tracker
        </Link>

        {/* <Show when="signed-out">
          <SignInButton />
          <SignUpButton />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show> */}

        <ul className="flex items-center gap-2.5">
          <li>
            <Link to="/expenses" className="navlink">
              Expenses
            </Link>
          </li>
          <li>
            <Link to="/" className="navlink">
              Add New
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
