import {
  authRoutes,
  expesnsesRoutes,
  protectedRoutes,
  publicRoutes,
} from "@/data/routePaths";
import { Show, useAuth, UserButton } from "@clerk/react";
import clsx from "clsx";
import { Link } from "react-router";
import SidebarTooltipTrigger from "./SidebarTooltipTrigger";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const isMobile = useIsMobile();
  const { isSignedIn } = useAuth();

  return (
    <header
      className={clsx(
        "bg-green-400 h-(--nav-height) py-2",
        isMobile ? "w-screen" : "",
      )}
    >
      <nav className="container flex justify-between">
        {/* Logo and Side bar trigger */}
        {/* Custom trigger */}
        {isMobile && isSignedIn ? (
          <SidebarTooltipTrigger
            tooltipTitle="Expand"
            icon={<Menu className="size-5.5" />}
            classNames="w-fit h-fit self-center has-[>svg]:px-0"
          />
        ) : (
          <Link
            to={expesnsesRoutes.list}
            // className="text-light-gray md:text-xl text-lg md:ml-12 xl:ml-0 sm:ml-0"
            className="text-light-gray md:text-xl text-lg"
          >
            Expenses Tracker
          </Link>
        )}

        <ul className="flex gap-2.5">
          <Show when="signed-out">
            {publicRoutes.map(({ href, title }) => (
              <li key={href}>
                <Link to={href} className="navlink">
                  {title}
                </Link>
              </li>
            ))}
          </Show>
          <Show when="signed-in">
            {protectedRoutes.map(({ href, title }) => (
              <li key={href}>
                <Link to={href} className="navlink">
                  {title}
                </Link>
              </li>
            ))}

            <li className="md:flex hidden">
              <UserButton signInUrl={authRoutes.login} />
            </li>
          </Show>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
