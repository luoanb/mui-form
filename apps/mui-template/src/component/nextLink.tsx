import { Link as LinkBase, LinkProps } from "react-router-dom";

export const Link = ({ href, to, ...props }: Partial<LinkProps & React.RefAttributes<HTMLAnchorElement>> & { href?: string }) => <LinkBase {...props} to={(to || href) as any} />;
