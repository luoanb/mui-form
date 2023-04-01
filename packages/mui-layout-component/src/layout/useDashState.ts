import { useState } from "react";

export const useDashState = () => {
  const [openNav, setOpenNav] = useState(false);
  const [miniNav, setMiniNav] = useState(true);
  const [openDesign, setOpenDesign] = useState(false)
  const [selectid, setSelectid] = useState("")
  return { openNav, miniNav, setMiniNav, setOpenNav, openDesign, setOpenDesign, selectid, setSelectid }
}
export type DashState = ReturnType<typeof useDashState>