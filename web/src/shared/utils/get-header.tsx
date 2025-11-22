import leftIcon from '@icons/chevron-left.svg';
import menuIcon from '@icons/menu.svg';
import { ROUTES } from '@routes/routes-config';
import { matchPath, type NavigateFunction } from 'react-router-dom';

export const getHeaderContent = (
  pathname: string,
  _urlParams: URLSearchParams,
  navigate: NavigateFunction,
) => {
  const isMain = matchPath(ROUTES.MAIN, pathname) !== null;
  const isCardDetail = matchPath(ROUTES.CARD_DETAIL(), pathname) !== null;
  const isSignUp = matchPath(ROUTES.SIGNUP, pathname) !== null;

  if (!isMain && !isCardDetail && !isSignUp) {
    return null;
  }

  const handleBack = () => {
    navigate(-1);
  };

  if (isMain) {
    return (
      <div className="flex-row-between px-[2.4rem] py-[1.3rem]">
        <div className="flex-row-center">
          <span className="h2 text-blue-60">서비스명</span>
        </div>

        <div className="flex w-[2.8rem] justify-end">
          <button
            type="button"
            aria-label="메뉴 열기"
            className="flex h-[2.8rem] w-[2.8rem] cursor-pointer"
          >
            <img src={menuIcon} alt="메뉴" className="h-[2.8rem] w-[2.8rem]" />
          </button>
        </div>
      </div>
    );
  }

  if (isSignUp || isCardDetail) {
    const title = isSignUp ? '회원가입' : '기능 이름';

    return (
      <div className="flex-row-between px-[2.4rem] py-[1.3rem]">
        <div className="flex w-[2.8rem] justify-start">
          <button
            type="button"
            onClick={handleBack}
            aria-label="뒤로가기"
            className="flex h-[2.8rem] w-[2.8rem] cursor-pointer"
          >
            <img
              src={leftIcon}
              alt="뒤로가기"
              className="h-[2.8rem] w-[2.8rem]"
            />
          </button>
        </div>

        <div className="flex flex-1 justify-center">
          <span className="h2 text-black">{title}</span>
        </div>

        <div className="flex w-[2.8rem] justify-end" />
      </div>
    );
  }

  return null;
};
