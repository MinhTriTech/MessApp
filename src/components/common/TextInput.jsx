import { forwardRef } from "react";

const TextInput = forwardRef((props, ref) => {
  const {
    className = "",
    ...restProps
  } = props;

  const combinedClassName = `text-input ${className}`.trim();

  return (
    <input
      ref={ref}
      className={combinedClassName}
      {...restProps}
    />
  );
});

TextInput.displayName = "TextInput";

export default TextInput;
