const AppRoute = ({ component: Component, layout: Layout }) => {
  return (
    <Layout>
      <Component />
    </Layout>
  );
};

export default AppRoute;
