import { NextPage } from 'next';
import useAdminLoginCheck from '../../hooks/useAdminLogInCheck';

const AdminDashboard: NextPage = () => {
  useAdminLoginCheck();
  return <div>You are logged in!</div>;
};

export default AdminDashboard;
