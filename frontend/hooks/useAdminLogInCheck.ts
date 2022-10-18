import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import api from '../frontendApis';
import { isAuthHeaderSaved, unsetAuthHeaders } from '../frontendApis/helpers/authHeaders';

/**
 * This hook can be used in any admin/* page.
 *
 * If the user is not logged in and is in a page that requires log in, they will be directed to the sign in page.
 * If the user is logged in and is in a page that requires them to be logged out, they will be directed to the dashboard.
 */
export default function useAdminLoginCheck() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const isLoggedIn = isAuthHeaderSaved();
    const isAdminSignedInPage = !router.asPath.includes('/admin/sign-up') && !router.asPath.includes('/admin/sign-in');
    if (isLoggedIn && !isAdminSignedInPage) {
      enqueueSnackbar('Already logged in.', { variant: 'info', preventDuplicate: true });
      router.push('/admin/');
    } else if (!isLoggedIn && isAdminSignedInPage) {
      enqueueSnackbar('Not logged in.', { variant: 'info', preventDuplicate: true });
      router.push('/admin/sign-in');
    } else if (isLoggedIn && isAdminSignedInPage) {
      api.admins.validateToken().catch(() => {
        unsetAuthHeaders();
        router.push('/admin/sign-in');
      });
      // If not caught and redirected, user may continue to use page.
    } else {
      // User is not logged in and is on /admin/sign-up or /admin/sign-in and may continue to use the page.
    }
  }, []);
}
