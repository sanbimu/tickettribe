import { useRef } from 'react';
import Button from '../components/Button';
import Logo from '../components/Logo';
import {
  useAuthContext,
  useNavContext,
  useWindowContext,
  useClickOutside,
} from '../hooks';
import { CloseSVG, FacebookSVG, InstagramSVG } from '../icons';
import ContinueWith from '../components/windows/ContinueWith';
import { useNavigate } from 'react-router-dom';
import PrivacyPolicy from '../components/windows/PrivacyPolicy';
import TermsConditions from '../components/windows/TermsConditions';
import FAQ from '../components/windows/FAQ';

const NavMobile: React.FC = () => {
  const navigate = useNavigate();
  const { openWindow } = useWindowContext();
  const { isAuthorized, user, signOut } = useAuthContext();
  const { setShowNav } = useNavContext();

  const navRef = useRef(null);
  useClickOutside(navRef, () => setShowNav(false));

  const handleNav = () => {
    setShowNav(false);
  };

  const handleSearch = () => {
    navigate('/search');
    setShowNav(false);
  };

  const handleSettings = () => {
    navigate('/settings');
    setShowNav(false);
  };

  const handleEvents = () => {
    navigate('/myevents');
    setShowNav(false);
  };

  const handlePrivacy = () => {
    openWindow({ content: <PrivacyPolicy /> });
  };

  const handleTerms = () => {
    openWindow({ content: <TermsConditions /> });
  };

  const handleFAQ = () => {
    openWindow({ content: <FAQ /> });
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[90] flex h-screen w-screen justify-end overflow-hidden bg-black bg-opacity-30 lg:hidden">
      <div
        className="relative flex h-[90%] w-[80%] flex-col bg-background md:w-[45%]"
        ref={navRef}
      >
        <div className="flex h-[12%] flex-row items-center justify-center border-b border-l border-black">
          <Button
            className="absolute left-3 top-3 flex h-[30px] w-[30px] items-center justify-center"
            onClick={handleNav}
          >
            <img src={CloseSVG} alt="X" className="h-[25px]"></img>
          </Button>
          <Logo />
        </div>

        <div className="flex h-[63%] flex-col items-end border-b border-l border-black pt-16 pr-12">
          {isAuthorized ? (
            <div className="flex flex-col gap-1">
              <Button className="mb-4 w-[170px] p-[0.60rem] font-franklin text-sm shadow-custom">
                <div className="flex flex-row items-center pl-3">
                  <img src={user.avatar} alt="ID" className="h-[25px] rounded-full"></img>
                  <p className="toolong pl-2">{user.firstName}</p>
                </div>
              </Button>

              <div className="flex flex-col items-start gap-2  pl-8 font-franklin text-sm text-dark-grey">
                <button className=" hover:text-dark-pink" onClick={handleEvents}>
                  - MY EVENTS
                </button>
                <button className=" hover:text-dark-pink" onClick={handleSettings}>
                  - SETTINGS
                </button>
                <button className=" hover:text-dark-pink" onClick={signOut}>
                  - LOG OUT
                </button>
              </div>
            </div>
          ) : (
            <Button
              className="w-[170px] p-[0.60rem] shadow-custom"
              onClick={() => openWindow({ content: <ContinueWith /> })}
            >
              <p className="font-franklin text-sm">SIGN IN / SIGN UP</p>
            </Button>
          )}
          <Button
            className="mt-6 w-[170px] p-[0.60rem] font-franklin text-sm shadow-custom"
            onClick={handleSearch}
            text="search"
          />

          <Button
            className="mt-6 w-[170px] p-[0.60rem] font-franklin text-sm shadow-custom"
            text="language"
          />
          {/* <div className="flex flex-col items-start gap-2 pb-0 pl-6 font-franklin text-sm text-dark-grey">
            <button className=" hover:text-dark-pink">- SAVED EVENTS</button>
            <button className=" hover:text-dark-pink">- SETTINGS</button>
          </div> */}

          <Button
            className="mt-6 w-[170px] p-[0.60rem] font-franklin text-sm shadow-custom"
            text="cart"
          />
        </div>

        <div className="flex h-[25%] flex-col items-end justify-center border-b border-l border-black pr-6 font-franklin text-xxs leading-[1.30rem]">
          <p className=" text-dark-grey">© 2023 VIBE INC.</p>
          <button
            className="pb-1 pt-[0.10rem] text-left hover:text-dark-pink"
            onClick={handlePrivacy}
          >
            Cookie Policy
          </button>
          <button
            className="pb-1 pt-[0.10rem] text-left hover:text-dark-pink"
            onClick={handleTerms}
          >
            Terms & Conditions
          </button>
          <button
            className="pb-1 pt-[0.10rem] text-left hover:text-dark-pink"
            onClick={handleFAQ}
          >
            FAQ
          </button>
          <p className="font-franklin text-xxs text-dark-grey">Contact Support</p>
          <div className="flex flex-row gap-2 pt-1">
            <img src={FacebookSVG} alt="facebook" className="h-[20px]"></img>
            <img src={InstagramSVG} alt="instagram" className="h-[20px]"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavMobile;
