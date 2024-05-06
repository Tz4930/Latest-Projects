import React from "react";
import Button from '@mui/material/Button';


const RegularButton = React.forwardRef((props, ref) => {
  const {
    color,
    round,
    variant,
    children,
    fullWidth,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    ...rest
  } = props;

  return (
    <Button {...rest} ref={ref} className={className} color={color} variant={variant}>
      {children}
    </Button>
  );
});

export default RegularButton;
