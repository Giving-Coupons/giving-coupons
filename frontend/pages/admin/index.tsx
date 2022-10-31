import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAdminLoginCheck from '../../hooks/useAdminLogInCheck';

const AdminDashboard: NextPage = () => {
  useAdminLoginCheck();
  const router = useRouter();

  useEffect(() => {
    if (router.pathname == '/admin') {
      router.push('/admin/campaigns');
    }
  });

  return null;
};

export default AdminDashboard;
