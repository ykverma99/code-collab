/* eslint-disable react/prop-types */
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

let styles = cva(
  [
    `inline-flex items-center justify-center gap-3 rounded-md hover:scale-[1.02] hover:brightness-[.96] active:-translate-y-0.5 transition-all delay-100 duration-500 ease-in-out`,
  ],
  {
    variants: {
      varient: {
        fill: ["bg-red-500 front-semibold text-white"],
        outline: ["border-white border-2 text-white"],
        flat: ["bg-transparent text-white border-0"],
      },
      size: {
        sm: ["p-2 text-xs font-medium md:px-4"],
        base: ["p-3 text-sm font-medium md:px-6 md:text-base"],
        lg: ["p-4 text-sm font-bold md:px-8 md:text-xl"],
      },
    },
    defaultVariants: {
      varient: "fill",
      size: "base",
    },
  },
);

const defaultElm = "button";
const Button = ({
  as,
  children,
  className,
  size,
  varient,
  leftIcon,
  rightIcon,
  onClick,
  ...restprops
}) => {
  let Component = as || defaultElm;
  return (
    <Component
      className={twMerge(styles({ varient, size, className }))}
      onClick={onClick}
      {...restprops}
    >
      {leftIcon != null ? <span>{leftIcon}</span> : null}
      {children}
      {rightIcon != null ? <span>{rightIcon}</span> : null}
    </Component>
  );
};

export default Button;
