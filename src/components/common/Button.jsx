import { forwardRef } from "react";

const Button = forwardRef((props, ref) => {
  const {
    className = "",
    children,
    ...restProps
  } = props;

  const combinedClassName = `btn ${className}`.trim();

  return (
    <button
      ref={ref}
      className={combinedClassName}
      {...restProps}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
