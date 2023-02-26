import { PropsWithChildren } from "react";
interface MainProps extends PropsWithChildren {
  leftComponent: any;
}
export default function Main({ leftComponent, children }: MainProps) {
  return (
    <div>
      <div>{leftComponent}</div>
      <div>{children}</div>
    </div>
  );
}
