import { useDispatch, useSelector } from 'react-redux';

import { toggleBurger } from '../../store/slices/burgerSlice';
import type { RootState } from '../../store/store';

export const BtnBurger = () => {
  const dispatch = useDispatch();
  const isOpenSearchDetailed = useSelector((state: RootState) => state.burger.isOpenSearchDetailed);

  return (
    <button 
      className={`header__burger burger btn-reset ${isOpenSearchDetailed ? 'burger--close' : ''}`}
      onClick={() => dispatch(toggleBurger())}
    >
      <span className={`burger__line ${isOpenSearchDetailed ? 'burger__line--close' : ''}`}></span>
    </button>
  );
};