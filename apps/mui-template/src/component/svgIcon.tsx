import Box, { BoxProps } from "@mui/material/Box";

export interface SvgIconProps {
  name: string;
  prefix?: string;
  color?: string;
  width?: number;
  height?: number;
  [propN: string]: any;
}
export default function SvgIcon({
  name,
  prefix = "icon",
  color = "#333",
  width = 24,
  height = 24,
  ...props
}: BoxProps<"svg", SvgIconProps>) {
  const symbolId = `#${prefix}-${name}`;
  return (
    <Box
      {...props}
      component="svg"
      width={width}
      height={height}
      aria-hidden="true"
      fontSize="medium"
    >
      <use href={symbolId} fill={color} />
    </Box>
  );
}
