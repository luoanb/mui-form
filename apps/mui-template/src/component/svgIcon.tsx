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
}: SvgIconProps) {
  const symbolId = `#${prefix}-${name}`;

  return (
    <svg
      {...props}
      width={width}
      height={height}
      aria-hidden="true"
      fontSize="14px"
    >
      <use href={symbolId} fill={color} />
    </svg>
  );
}
