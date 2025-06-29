import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
// component
// import Login from 'pages/auth/login';
import { checkIfAccess, getUserCred } from '@/utils/helper';
// import LoadingScreen from '@/components/loading-screen';
// import Page403 from '../pages/403';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { pathname, push } = useRouter();

  const getUserData = getUserCred('userCred');
  const isAuthenticated = !!getUserData?.token;

  const [isInitialized, setIsInitialized] = useState(false);
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsInitialized(true);
    }, 1300);
  }, []);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      push(requestedLocation);
    }
    if (isAuthenticated) {
      setRequestedLocation(null);
    }
  }, [isAuthenticated, pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <></>;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    push('/login/'); // Navigate to the login page
    return null;
  }
  if (!checkIfAccess(userKey!)) {
    push('/login'); // Navigate to the 403 page
    return null;
  }

  return <>{children}</>;
}
