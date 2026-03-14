import React, { Fragment, type ReactNode } from "react";
import { Button } from "../ui/button";
import clsx from "clsx";
import { Spinner } from "../ui/spinner";

interface customButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  formId?: string;
  title: string;
  icon?: ReactNode;
  iconClassName?: string;
  prefixIcon?: boolean;
  suffixIcon?: boolean;
  isLoading?: boolean;
}

const CustomButton = ({
  type,
  disabled,
  className,
  formId,
  title,
  icon,
  iconClassName,
  prefixIcon = false,
  suffixIcon = false,
  isLoading,
}: customButtonProps) => {
  return (
    <Button
      className={clsx("pill-button", className)}
      type={type}
      form={formId}
      disabled={disabled}
    >
      {isLoading ? (
        <Spinner data-icon="inline-start" />
      ) : (
        <Fragment>
          {prefixIcon && icon ? (
            <div className={clsx("pill-button-icon", iconClassName)}>
              {icon}
            </div>
          ) : null}
          <span>{title}</span>
          {suffixIcon && icon ? (
            <div className={clsx("pill-button-icon", iconClassName)}>
              {icon}
            </div>
          ) : null}
        </Fragment>
      )}
    </Button>
  );
};

export default CustomButton;
