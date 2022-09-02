import axios from 'axios';

const Home = ({ currentUser }) => {
  console.log(currentUser.currentUser);
  return currentUser.currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

export async function getServerSideProps({ req }) {
  const { data: currentUser } = await axios.get(
    'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
    {
      withCredentials: true,
      headers: req.headers,
    }
  );
  return { props: { currentUser } };
} 

export default Home;
