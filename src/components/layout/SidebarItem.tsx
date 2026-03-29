import { type ReactNode } from "react";
import { SidebarMenuButton, useSidebar } from "../ui/sidebar";
import { Link } from "react-router";

const SidebarItem = ({
  title,
  url,
  icon,
}: {
  title: string;
  url: string;
  icon: ReactNode;
}) => {
  const { open, openMobile, setOpen, setOpenMobile } = useSidebar();
  return (
    <SidebarMenuButton asChild tooltip={title} className="hover:bg-light-gray">
      <Link
        to={url}
        onClick={() => {
          if (openMobile) {
            setOpenMobile(false);
          }
          if (open) {
            setOpen(false);
          }
        }}
      >
        {icon}
        <span>{title}</span>
      </Link>
    </SidebarMenuButton>
  );
};

export default SidebarItem;
