import {observer} from 'mobx-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

import {useUserThemePreference} from '@/core/hooks/useUserThemePreference';
import {Bar} from '@/core/ui/Bar';
import {Icon} from '@/core/ui/Icon';
import {Box, styled} from '@/core/ui/system';

import {DesktopOnly, MobileOnly} from './PageLayout';

// The elements connected to wallet functionality need to be imported dynamically
// with ssr option set to false
//
// This is to avoid hydration errors (naturally the wallet providers are not available on the server
// so their server version would not match the client version)
const ConnectButtons = dynamic(() => import('./ConnectButtons').then((m) => m.ConnectButtons), {
  ssr: false,
});

const NavLink = styled('a', {name: 'NavLink'})<{pathname?: string}>(({theme, pathname, href}) => ({
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  ...theme.typography.p2,
  ...(pathname === href && {
    color: theme.palette.text.primary,
  }),
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));

const Logo = styled(Image, {name: 'Logo'})(({theme}) => ({
  filter: theme.palette.mode === 'light' ? 'invert(1)' : 'invert(0)',
}));

export const AppHeader = observer(() => {
  const router = useRouter();
  const {pathname} = router;
  const {changeUserThemePreference} = useUserThemePreference();
  const logoStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
  };
  
  useEffect(() => {
    changeUserThemePreference('Telos Dark');
  }, [changeUserThemePreference]);

  return (
    <Bar>
      <Bar.Section sx={{gap: {md: 6}, width:{xs: "100%", md: 'unset'}}}>
        <Link href='/bridge' passHref legacyBehavior>
          <NavLink sx={{ margin: {xs: 'auto'}, width:{xs: "100%", md: 'unset'}}} pathname={pathname} style={logoStyle} >
            <div className="flex items-center sm:mr-4 app-logo" data-v-f54e6abb="" data-v-20a3da16="" style={{textAlign:'center'}}>
              <svg width={70} height={70} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.9981 10.2941C22.5226 9.89286 23.0548 9.52378 23.5339 9.09521C24.1447 8.54872 24.5982 7.8714 24.9635 7.13729C24.9993 7.06524 25.0415 6.99637 25.107 6.87915C26.6251 9.2544 27.3325 11.8138 27.2125 14.5811C27.0581 18.1417 25.6738 21.1625 23.0802 23.6619C21.6563 20.8511 20.2473 18.0694 18.8325 15.2765C19.5115 14.8222 20.066 14.2669 20.4773 13.497C20.3426 13.5352 20.2585 13.5573 20.1754 13.583C19.5931 13.7628 19.0115 13.9451 18.428 14.1209C18.3724 14.1377 18.2645 14.1356 18.2508 14.1078C18.2113 14.0277 18.1636 13.9078 18.1965 13.8425C18.5675 13.1063 18.9505 12.3761 19.3387 11.6489C19.3731 11.5846 19.4617 11.5418 19.5337 11.5062C20.3489 11.1022 21.1658 10.7014 21.9981 10.2941Z" fill="white"></path><path d="M14.5591 18.0762C15.845 20.8807 17.1238 23.6691 18.4225 26.5007C17.9153 26.6367 17.4267 26.7777 16.9331 26.898C16.025 27.1192 15.0973 27.2077 14.1669 27.2141C13.1434 27.2212 12.1197 27.1383 11.1324 26.8582C10.8723 26.7843 10.664 26.5147 10.4466 26.3187C10.4154 26.2905 10.4512 26.1629 10.483 26.0938C11.2015 24.5341 11.9238 22.9761 12.6453 21.4178C13.1647 20.2959 13.6829 19.1733 14.2062 18.0532C14.2404 17.9801 14.314 17.9253 14.3692 17.862C14.4302 17.928 14.4911 17.9941 14.5591 18.0762Z" fill="white"></path><path d="M9.74854 15.54C9.61653 15.9139 9.37355 16.1096 9.01259 16.2636C7.28212 17.0017 6.20225 18.3011 5.83511 20.157C5.66771 21.0033 5.69781 21.8573 5.89297 22.6975C5.94871 22.9375 5.94246 23.1391 5.81103 23.346C5.72577 23.4801 5.6621 23.628 5.57205 23.8021C4.55095 22.4186 3.61998 21.0329 3.71805 19.2257C3.78468 17.9978 4.17694 16.8924 4.95366 15.9297C5.69067 15.0163 6.67079 14.4381 7.72236 13.9856C8.43319 13.6798 9.18442 13.4682 9.916 13.21C10.0988 13.1454 10.1819 13.203 10.2912 13.3694C10.5402 13.7481 10.561 14.0785 10.2994 14.4675C10.0799 14.794 9.93541 15.1709 9.74854 15.54Z" fill="white"></path><path d="M13.3458 9.55638C13.418 9.72378 13.4824 9.87545 13.5494 10.0334C12.5096 10.1911 11.4857 10.3463 10.438 10.5051C10.1909 10.0219 9.9364 9.52172 9.67974 9.02265C9.25541 8.19754 8.82857 7.37371 8.40504 6.54819C8.1926 6.1341 8.34784 5.87982 8.81234 5.87888C9.55465 5.87739 10.297 5.88141 11.0393 5.87741C11.4976 5.87493 11.8282 6.04262 11.995 6.49934C12.1118 6.81921 12.2681 7.12462 12.4199 7.46581C11.4899 7.7227 10.576 7.97515 9.6954 8.21841C10.2853 8.21841 10.9052 8.22396 11.5249 8.21623C11.8683 8.21194 12.2119 8.19148 12.5544 8.16606C12.6928 8.15579 12.7554 8.20801 12.807 8.3308C12.9775 8.7368 13.1601 9.13776 13.3458 9.55638Z" fill="white"></path><path d="M17.9786 9.4401C17.5278 9.52111 17.0946 9.59357 16.6607 9.66108C16.2996 9.71725 15.9377 9.76804 15.5761 9.82023C15.4742 9.83493 15.3718 9.84612 15.2441 9.86212C15.3885 9.52308 15.5247 9.19414 15.6683 8.86847C15.8084 8.55077 15.9824 8.24502 16.0895 7.91704C16.1449 7.74749 16.2594 7.72986 16.3669 7.71343C17.4965 7.54077 18.6157 7.327 19.6909 6.92702C19.9017 6.84859 20.1051 6.75009 20.346 6.64612C20.0019 7.31129 19.6712 7.9512 19.3393 8.59049C19.3087 8.64952 19.253 8.70049 19.2385 8.76216C19.1351 9.20138 18.7852 9.29465 18.4144 9.36076C18.2752 9.38557 18.1354 9.40663 17.9786 9.4401Z" fill="white"></path><path d="M3.53788 13.7818C2.76211 14.7231 2.17712 15.7532 1.80103 16.8975C1.69201 17.2292 1.60899 17.5695 1.51604 17.8988C0.79764 16.9775 0.748036 12.6961 1.41406 10.4249C2.14964 7.91657 3.50197 5.81354 5.50178 4.07056C6.65774 6.32041 7.80157 8.54666 8.96552 10.8121C6.8658 11.293 4.96291 12.0913 3.53788 13.7818Z" fill="url(#paint0_linear_0_1)"></path><path d="M12.8553 0.965328C14.1997 0.85039 15.5137 0.911128 16.8116 1.20008C17.3026 1.3094 17.7319 1.56153 18.1317 1.86391C18.271 1.96923 18.1977 2.07834 18.1493 2.18907C17.7545 3.0926 17.3593 3.99598 16.9642 4.8994C16.808 5.25657 16.6603 5.61786 16.4901 5.96824C16.4423 6.06658 16.3423 6.17393 16.2428 6.20747C15.1673 6.56998 14.0871 6.91856 13.0082 7.27097C12.8884 7.31009 12.8145 7.28082 12.7589 7.15428C11.9502 5.31378 11.1377 3.47496 10.3226 1.63724C10.2617 1.49982 10.2969 1.44265 10.4375 1.41487C11.1083 1.2824 11.778 1.14433 12.4488 1.01223C12.5754 0.987299 12.7056 0.980417 12.8553 0.965328Z" fill="url(#paint1_linear_0_1)"></path><path d="M15.5154 18.5457C15.2222 17.898 14.9339 17.267 14.6338 16.6099C15.6575 16.3259 16.6512 16.0503 17.6639 15.7693C18.0181 16.4801 18.3741 17.201 18.7359 17.919C19.3168 19.0715 19.9026 20.2216 20.4843 21.3738C20.6861 21.7737 20.5558 21.9914 20.1198 21.9915C19.255 21.9917 18.3901 21.9895 17.5253 21.9927C17.2532 21.9937 17.0571 21.8816 16.9432 21.6348C16.48 20.6307 16.0185 19.6258 15.5559 18.6214C15.5464 18.6007 15.5324 18.582 15.5154 18.5457Z" fill="url(#paint2_linear_0_1)"></path><path d="M12.2879 20.5091C12.1329 20.8433 11.9867 21.1625 11.8385 21.4807C11.6782 21.8248 11.4244 22.0037 11.0273 21.9959C10.3167 21.9818 9.60556 21.9919 8.89464 21.9919C8.81287 21.9919 8.73111 21.9919 8.59082 21.9919C8.65284 21.6678 8.68712 21.3744 8.76658 21.0938C9.05989 20.058 9.67019 19.2345 10.4672 18.5215C11.4529 17.6397 12.6415 17.1977 13.8826 16.8512C13.8954 16.8476 13.9114 16.8556 13.9722 16.8665C13.41 18.0828 12.8529 19.2882 12.2879 20.5091Z" fill="url(#paint3_linear_0_1)"></path><path d="M14.7987 14.9292C13.5859 15.1775 12.392 15.4204 11.1436 15.6744C11.3164 15.3307 11.4632 15.0392 11.6098 14.7476C11.7573 14.4541 11.9399 14.1723 12.0428 13.8639C12.16 13.5124 11.7785 13.2915 11.7275 12.9363C13.636 12.8358 15.5347 12.6387 17.4539 12.1411C17.3451 12.3531 17.2643 12.5117 17.1825 12.6697C17.1509 12.7309 17.1165 12.7905 17.0848 12.8515C16.9439 13.1228 16.7181 13.3852 16.688 13.6684C16.6602 13.9289 16.843 14.2118 16.9455 14.5224C16.2502 14.6535 15.5339 14.7886 14.7987 14.9292Z" fill="url(#paint4_linear_0_1)"></path><path d="M21.7878 6.95039C22.2169 6.13279 22.6374 5.32974 23.0579 4.52661C23.3711 4.69624 23.4467 4.96106 23.4472 5.26446C23.4492 6.45694 22.8627 7.29766 21.8705 7.89188C21.6371 8.03162 21.3933 8.15392 21.1143 8.25204C21.3359 7.82301 21.5575 7.39398 21.7878 6.95039Z" fill="url(#paint5_linear_0_1)"></path><path d="M15.3324 7.90189C15.4418 7.89422 15.5317 7.88728 15.6561 7.87769C15.6047 8.00033 15.5606 8.10926 15.5136 8.21693C15.2998 8.70736 15.0814 9.19582 14.8734 9.68867C14.8147 9.8277 14.7541 9.91823 14.5789 9.91262C14.4296 9.90783 14.2791 9.95816 14.1281 9.96962C14.0802 9.97326 13.9999 9.9434 13.9832 9.90667C13.7216 9.332 13.4679 8.7537 13.2051 8.1596C13.9291 8.07134 14.621 7.98698 15.3324 7.90189Z" fill="url(#paint6_linear_0_1)"></path><defs><linearGradient id="paint0_linear_0_1" x1="0.944336" y1="10.9847" x2="8.95471" y2="11.2791" gradientUnits="userSpaceOnUse"><stop stop-color="#C004FE"></stop><stop offset="1" stop-color="#7E02F5"></stop></linearGradient><linearGradient id="paint1_linear_0_1" x1="10.2939" y1="4.09889" x2="18.1637" y2="4.71801" gradientUnits="userSpaceOnUse"><stop stop-color="#C004FE"></stop><stop offset="1" stop-color="#7E02F5"></stop></linearGradient><linearGradient id="paint2_linear_0_1" x1="14.6338" y1="18.881" x2="20.5553" y2="19.2393" gradientUnits="userSpaceOnUse"><stop stop-color="#C004FE"></stop><stop offset="1" stop-color="#7E02F5"></stop></linearGradient><linearGradient id="paint3_linear_0_1" x1="8.59082" y1="19.4232" x2="13.9487" y2="19.7782" gradientUnits="userSpaceOnUse"><stop stop-color="#C004FE"></stop><stop offset="1" stop-color="#7E02F5"></stop></linearGradient><linearGradient id="paint4_linear_0_1" x1="11.1436" y1="13.9077" x2="17.3741" y2="14.6127" gradientUnits="userSpaceOnUse"><stop stop-color="#C004FE"></stop><stop offset="1" stop-color="#7E02F5"></stop></linearGradient><linearGradient id="paint5_linear_0_1" x1="21.1143" y1="6.38932" x2="23.4435" y2="6.48173" gradientUnits="userSpaceOnUse"><stop stop-color="#C004FE"></stop><stop offset="1" stop-color="#7E02F5"></stop></linearGradient><linearGradient id="paint6_linear_0_1" x1="13.2051" y1="8.9238" x2="15.6426" y2="9.10471" gradientUnits="userSpaceOnUse"><stop stop-color="#C004FE"></stop><stop offset="1" stop-color="#7E02F5"></stop></linearGradient></defs>
              </svg>
              <div> POLARIS </div><div> B R I D G E </div>
              </div>
            {/* <Logo src={'/static/telos-logo.png'} width={95} height={112} alt='Telos Blockchain Logo' priority={true} /> */}
          </NavLink>
        </Link>
        {/* <NavLink sx={{ margin:{xs: "auto", md: 'unset'}}} href='https://stakely.io/en/faucet/telos-evm-tlos' target='_blank' rel="noreferrer">
          Faucet 
        </NavLink>
        <NavLink href='https://dapp.ptokens.io/#/swap?asset=tlos&from=eth&to=telos' target='_blank' rel="noreferrer" >
          TLOS Bridge
        </NavLink>
        <Link href='/oft' passHref legacyBehavior>
          <NavLink pathname={pathname}>OFT</NavLink>
        </Link>
        <Link href='/onft' passHref legacyBehavior>
          <NavLink pathname={pathname}>ONFT</NavLink>
        </Link> */}
      </Bar.Section>
      <Bar.Section>
        <DesktopOnly>
          <ConnectButtons />
        </DesktopOnly>
      </Bar.Section>
    </Bar>
  );
});

export const AppFooter = () => {
  return (
    <Bar>
      <MobileOnly>
        <Bar.Section>
          <ConnectButtons />
        </Bar.Section>
      </MobileOnly>
      <Bar.Section sx={{minWidth: '300px'}}>
        {/* <a href='https://layerzero.network' target='_blank' rel='noreferrer'>
          <Logo src={'/static/layerzero.svg'} height={24} width={88} alt='logo' />
        </a> */}
      </Bar.Section>
      <Bar.Section sx={{typography: 'p3'}}>
       <Box
          component='a'
          href='https://polarisfinance.io/'
          sx={{typography: 'link', display: 'flex', alignItems: 'center', gap: 1}}
          target='_blank'
        >
          <Icon type='globe' size={16} />
          polarisfinance.io
        </Box>
        <Box
          component='a'
          href='https://app.polarisfinance.io/'
          sx={{typography: 'link', display: 'flex', alignItems: 'center', gap: 1}}
          target='_blank'
        >
          <Icon type='globe' size={16} />
          polaris DEX
        </Box>
        {/* <Box
          component='a'
          href='https://docs.telos.net/'
          sx={{typography: 'link', display: 'flex', alignItems: 'center', gap: 1}}
          target='_blank'
        >
          <Icon type='file' size={16} />
          Telos Docs
        </Box> */}
      </Bar.Section>
    </Bar>
  );
};
