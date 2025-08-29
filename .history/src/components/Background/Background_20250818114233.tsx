import { RootState } from "@/store/store";

import { useSelector } from "react-redux";

export const Background = () => {
  const isBackground = useSelector((state: RootState) => state.backgroundSlice.isBackground);

  if (!isBackground) return null;

  return (
    <div className="background"></div>
  )
}