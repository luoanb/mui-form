import { Global, css } from "@emotion/react";

const gloablcss = css`
  #root{
    width: 100%;
    height: 100vh;
  }
  .some-class {
    color: hotpink !important;
    font-size: 12px;
  }
`;
export default function Style() {
  return (
    <>
      <Global styles={gloablcss} />
    </>
  );
}
