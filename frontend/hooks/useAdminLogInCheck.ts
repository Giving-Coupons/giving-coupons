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
    } else if (isLoggedIn) {
      // TODO: Replace this API call with a proper endpoint to test tokens.
      api.interests.list().catch((err) => {
        if ('This action can only be performed by an authenticated admin' === err.message.message) {
          unsetAuthHeaders();
          enqueueSnackbar('Your credentials could not be verified.', { variant: 'error', preventDuplicate: true });
          router.push('/admin/sign-in');
        }
      });
    }
  }, []);
}
