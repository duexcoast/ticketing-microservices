import axios from 'axios';
import BaseLayout from '../components/base-layout';
import getCurrentUser from './api/get-current-user';

const Home = ({ currentUser }) => {
  return (
    <BaseLayout currentUser={currentUser.currentUser}>
      {currentUser.currentUser ? (
        <h1>You are signed in</h1>
      ) : (
        <h1>You are not signed in</h1>
      )}
    </BaseLayout>
  );
};

export async function getServerSideProps({ req }) {
  const currentUser = await getCurrentUser(req.headers);

  return { props: { currentUser } };
}

export default Home;
