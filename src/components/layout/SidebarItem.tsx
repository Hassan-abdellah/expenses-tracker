import { type ReactNode } from "react";
import { SidebarMenuButton } from "../ui/sidebar";
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
  return (
    <SidebarMenuButton asChild tooltip={title} className="hover:bg-light-gray">
      <Link to={url}>
        {icon}
        <span>{title}</span>
      </Link>
    </SidebarMenuButton>
  );
};

export default SidebarItem;
