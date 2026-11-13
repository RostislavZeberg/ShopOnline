"use client";
import { useDispatch, useSelector } from "react-redux";
import { toggleBurger } from "../../store/slices/burgerSlice";
import type { RootState } from "../../store/store";

export const BtnBurgerSearch = () => {
  const dispatch = useDispatch();
  const isOpenSearchDetailed = useSelector(
    (state: RootState) => state.burgerSlice.isOpenSearchDetailed,
  );

  return (
    <button
      type="button"
      className={`burger burger__search btn-reset ${isOpenSearchDetailed ? "burger--close" : ""}`}
      onClick={() => dispatch(toggleBurger())}
      aria-label="Детальный поиск"
    >
      <span
        className={`burger__line ${isOpenSearchDetailed ? "burger__line--close" : ""}`}
      ></span>
    </button>
  );
};
