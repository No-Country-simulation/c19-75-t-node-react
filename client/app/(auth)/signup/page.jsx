import SingupPage from '@/containers/auth-page/singup-page';

const SingupRoute = ({ searchParams }) => {
  return <SingupPage userTypeSelected={searchParams?.role || ''} />;
};

export default SingupRoute;
