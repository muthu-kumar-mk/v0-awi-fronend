import Head from 'next/head';
import { m } from 'framer-motion';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { SeverErrorIllustration } from 'assets/illustrations';
import { MotionContainer, varBounce } from 'components/animate';

export default function NoInternet() {
  const router = useRouter();

  useEffect(() => {
    function handleNetworkStatusChange() {
      if (navigator?.onLine) {
        router.back();
      }
    }

    handleNetworkStatusChange(); // Check initial network status

    window.addEventListener('online', handleNetworkStatusChange);
    return () => {
      window.removeEventListener('online', handleNetworkStatusChange);
    };
  }, []);

  return (
    <Fragment>
      <Head>
        <title> Internet Connection Error | AWI</title>
      </Head>

      <MotionContainer
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Lost internet connection
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Please check your internet connection or try again later
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>
      </MotionContainer>
    </Fragment>
  );
}
