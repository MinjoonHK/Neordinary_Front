import { ROUTES } from '@routes/routes-config';
import { getHeaderContent } from '@utils/get-header';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const urlParams = new URLSearchParams(search);

  const isLogin = matchPath(ROUTES.LOGIN, pathname) !== null;
  const isMain = matchPath(ROUTES.MAIN, pathname) !== null;

  if (isLogin) {
    return null;
  }

  return (
    <header className={isMain ? 'main-header-layout' : 'header-layout'}>
      {getHeaderContent(pathname, urlParams, navigate)}
    </header>
  );
};

export default Header;
