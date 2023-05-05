import React from 'react';
import { useCookieContext, useWindowContext } from '../../hooks';
import Button from '../Button';
import Circle from '../shapes/Circle';
import PrivacyPolicy from './PrivacyPolicy';

const CookieModal: React.FC = () => {
  const { openWindow } = useWindowContext();
  const { closeCookies } = useCookieContext();

  const handlePrivacy = () => {
    openWindow({ content: <PrivacyPolicy /> });
  };

  return (
    <div className="fixed bottom-2 right-2 z-[90] flex h-auto w-[70%] flex-col border border-black bg-background md:w-[60%] lg:w-[30%]">
      <div className="border-8 border-dark-pink-transparent p-4">
        <div className="flex flex-col items-center justify-center gap-6">
          <p className="z-40 text-center font-franklin text-dark-grey lg:pt-3">
            This website uses cookies to ensure you get the best experience on our
            website.
          </p>
          {/* <div className="absolute top-4 left-7 z-30 h-[20px] w-[400px] bg-dark-pink-transparent"></div>
          <div className="absolute top-10 left-28 z-30 h-[20px] w-[240px] bg-dark-pink-transparent"></div> */}

          {/* <Circle className="absolute right-12 top-12 bg-orange-muted" size={45}></Circle>
        <Circle
          className="absolute top-[3.85rem] right-[3.75rem]  bg-brown-muted"
          size={7}
        ></Circle>
        <Circle
          className="absolute top-[4.75rem] right-[4rem]  bg-brown-muted"
          size={7}
        ></Circle>
        <Circle
          className="absolute top-[4.1rem] right-[4.7rem]  bg-brown-muted"
          size={7}
        ></Circle> */}

          <div className="flex flex-row items-center justify-center gap-2 md:gap-8 lg:pb-3">
            <Button
              className="py-2 px-3 md:py-3 md:px-6"
              text="Privacy Policy"
              onClick={handlePrivacy}
            ></Button>
            <Button
              className="py-2 px-3 md:py-3 md:px-6"
              text="OK"
              onClick={closeCookies}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieModal;
