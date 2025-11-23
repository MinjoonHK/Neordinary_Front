import leftIcon from '@icons/chevron-left.svg';
import { ROUTES } from '@routes/routes-config';
import { matchPath } from 'react-router-dom';

export const getHeaderContent = (
  pathname: string,
  _urlParams: URLSearchParams,
  onBack: () => void,
) => {
  const isCardDetail = matchPath(ROUTES.CARD_DETAIL(), pathname) !== null;
  const isSignUp = matchPath(ROUTES.SIGNUP, pathname) !== null;
  const isWorry = matchPath(ROUTES.WORRY, pathname) !== null;
  const isRecord = matchPath(ROUTES.RECORD, pathname) !== null;

  if (!isCardDetail && !isSignUp && !isWorry && !isRecord) {
    return null;
  }

  const title = isSignUp ? '회원가입' : isWorry ? '고민 털어놓기' : '챌린지';

  return (
    <div className="flex-row-between px-[2.4rem] py-[1.3rem]">
      <div className="flex w-[2.8rem] justify-start">
        <button
          type="button"
          onClick={onBack}
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
};
