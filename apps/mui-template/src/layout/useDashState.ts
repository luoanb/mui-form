import { useState } from "react";

export const useDashState = () => {
  const [openNav, setOpenNav] = useState(false);
  const [miniNav, setMiniNav] = useState(false);
  return { openNav, miniNav, setMiniNav, setOpenNav }
}
export type DashState = ReturnType<typeof useDashState>