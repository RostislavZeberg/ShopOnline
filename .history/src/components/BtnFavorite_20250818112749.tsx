"use client"
import { useSelector } from "react-redux";
import { useCallback, type FC } from "react";

import { useAppDispatch } from "@/store/hooks";
import { toggleFavorite } from "@/store/slices/favoriteSlice";
import { RootState } from "@/store/store";
import { toggleAuthForm } from "@/store/slices/authFormSlice";


interface BtnFavoriteProps {
  isFavorite: boolean,
  id: number,
}

export const BtnFavorite: FC<BtnFavoriteProps> = ({ isFavorite, id }) => {
  const isEnterLogIn = useSelector((state: RootState) => state.logInSlice.isEnterLogIn);
  const dispatch = useAppDispatch();

  if (isEnterLogIn === false) {
    isFavorite = false;
  };

  const handleToggleFavorite = useCallback(() => {
    if (isEnterLogIn) {
      dispatch(toggleFavorite(id));
    } else {
      dispatch(toggleAuthForm());
    }
  }, [dispatch, id, isEnterLogIn]);

  const ariaLabel = isFavorite ? "Удалить из избранного" : "Добавить в избранное"

  return (
    <>
      {!isFavorite ?
        <svg className="icon-favorite"
          onClick={handleToggleFavorite}
          viewBox="0 -19 469.33333 469"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={ariaLabel}
        >
          <path d="m234.667969 431.234375-194.933594-194.933594c-25.601563-26.265625-39.734375-60.800781-39.734375-97.199219 0-76.667968 62.265625-138.933593 138.933594-138.933593 34.398437 0 68.800781 14.933593 95.734375 41.199219 26.933593-26.265626 61.332031-41.199219 95.730469-41.199219 76.667968 0 138.933593 62.265625 138.933593 138.933593 0 36.53125-14.132812 71.066407-39.730469 97.199219zm-95.734375-409.734375c-64.933594 0-117.601563 52.667969-117.601563 117.601562 0 30.933594 12 60.132813 33.601563 82.265626l179.734375 179.734374 179.867187-179.867187c21.597656-22 33.464844-51.199219 33.464844-82.132813 0-64.800781-52.667969-117.601562-117.601562-117.601562-31.730469 0-63.863282 15.464844-87.730469 42.398438l-8 8.933593-8-8.933593c-23.867188-26.933594-56-42.398438-87.734375-42.398438zm0 0" />
        </svg>
        :
        <svg
          className="icon-favorite--active"
          onClick={handleToggleFavorite}
          viewBox="0 -19 469.33333 469"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={ariaLabel}
        >
          <path
            fill="rgb(167, 58, 253)"
            stroke="none"
            d="M234.667969 431.234375L39.734375 236.300781c-25.601563-26.265625-39.734375-60.800781-39.734375-97.199219 0-76.667968 62.265625-138.933593 138.933594-138.933593 34.398437 0 68.800781 14.933593 95.734375 41.199219 26.933593-26.265626 61.332031-41.199219 95.730469-41.199219 76.667968 0 138.933593 62.265625 138.933593 138.933593 0 36.53125-14.132812 71.066407-39.730469 97.199219z"
          />
        </svg>
      }
    </>
  )
}