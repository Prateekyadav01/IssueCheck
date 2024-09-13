import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";

const Profile = () => {
  const user = useSelector((state) => state?.user?.value);

  console.log('User data:', user); // Ensure this logs correctly
  return (
    <div className="border h-full w-1/2 m-10 p-10">
      <CgProfile className="h-10 w-10 rounded-full" />
      <h1>{user?.data?.name || 'Name not available'}</h1>
      <h1>{user?.data?.email || 'Email not available'}</h1>
      <h1>{user?.data?.iat || 'Issued at not available'}</h1>
      <h1>{user?.data?.exp || 'Expiration not available'}</h1>
    </div>
  );
}

export default Profile;
