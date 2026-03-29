import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  CalendarCheck,
  ChevronsLeft,
  ChevronsRight,
  DollarSignIcon,
  Heart,
  LayoutDashboardIcon,
} from "lucide-react";
import { UserButton } from "@clerk/react";
import { authRoutes, dashboardsRoutes } from "@/data/routePaths";
import { Link } from "react-router";
import { Button } from "../ui/button";
import SidebarItem from "./SidebarItem";
import SidebarTooltipTrigger from "./SidebarTooltipTrigger";

const AppSidebar = () => {
  const { open, openMobile, toggleSidebar } = useSidebar();
  return (
    <Sidebar collapsible="icon" className="bg-light-gray">
      <SidebarHeader className="bg-green-200 text-light-gray h-(--nav-height) flex-row items-center justify-between">
        <SidebarMenuButton asChild tooltip={"Expenses Tracker"}>
          <Link to={"/"}>
            <DollarSignIcon />
            <span>Expenses Tracker</span>
          </Link>
        </SidebarMenuButton>

        {/* Custom trigger */}
        {open || openMobile ? (
          <SidebarTooltipTrigger
            tooltipTitle="Minimize"
            icon={<ChevronsLeft />}
          />
        ) : null}
      </SidebarHeader>

      <SidebarContent className="my-15">
        <SidebarGroup className="space-y-2">
          <SidebarItem
            title="Dashboard"
            url={dashboardsRoutes.index}
            icon={<LayoutDashboardIcon />}
          />
          <SidebarItem
            title="Monthly Expenses"
            url="/"
            icon={<CalendarCheck />}
          />

          <SidebarItem title="Wishlist" url="/" icon={<Heart />} />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="space-y-4">
        {/* Custom trigger */}
        {!open && !openMobile ? (
          <SidebarMenuButton asChild tooltip={"Expand"}>
            <Button
              onClick={() => toggleSidebar()}
              className="cursor-pointer bg-transparent hover:bg-light-gray  text-muted-black rounded-lg items-center justify-center"
            >
              <ChevronsRight />
            </Button>
          </SidebarMenuButton>
        ) : null}

        <UserButton
          signInUrl={authRoutes.login}
          // showName={open || openMobile}
        />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
