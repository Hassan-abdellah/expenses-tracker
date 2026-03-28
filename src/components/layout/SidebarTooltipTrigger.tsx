import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";
import type { ReactNode } from "react";
import clsx from "clsx";

const SidebarTooltipTrigger = ({
  icon,
  tooltipTitle,
  classNames,
}: {
  icon: ReactNode;
  tooltipTitle: string;
  classNames?: string;
}) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Tooltip>
      <TooltipTrigger asChild className="p-0">
        <Button
          onClick={() => toggleSidebar()}
          className={clsx(
            "cursor-pointer bg-transparent text-light-gray hover:bg-light-gray hover:text-muted-black rounded-lg",
            classNames ? classNames : "",
          )}
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right" className="hidden md:block">
        <p>{tooltipTitle}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default SidebarTooltipTrigger;
