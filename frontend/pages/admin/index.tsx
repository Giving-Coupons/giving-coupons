import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useAdminLoginCheck from '../../hooks/useAdminLogInCheck';
import { useEffect } from 'react';

const AdminDashboard: NextPage = () => {
  useAdminLoginCheck();
  const router = useRouter();

  useEffect(() => {
    if (router.pathname == '/admin') {
      router.push('/admin/interests');
    }
  });

  return null;
};

export default AdminDashboard;
