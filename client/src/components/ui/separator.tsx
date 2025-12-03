"use client";
import * as React from "react";
import clsx from "clsx";

const Separator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx("shrink-0 bg-border h-[1px] w-full", className)}
    {...props}
  />
));
Separator.displayName = "Separator";

export { Separator };
