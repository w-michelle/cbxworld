import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/authSlice";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const currentUser = useSelector(selectUser);
  return (
    <div className="max-w-screen-md w-full">
      <div className="p-4 w-full border-2 border-[#ffff] rounded-lg">
        <div className="flex gap-2">
          <div
            className="rounded-full w-8 h-8"
            style={{ backgroundImage: `${currentUser?.profile}` }}
          ></div>
          <div className="bg-red">
            <Link to={`/user/${currentUser?._id}`}>
              <p className="hover:underline hover:text-customBlue">
                {currentUser?.username}
              </p>
            </Link>
            {currentUser?.membership ? (
              <div>
                <p className="text-xs text-neutral-400">Member</p>
              </div>
            ) : (
              <div>
                <p className="text-xs text-neutral-400 mb-2">Non-member</p>
                <Link
                  to="/join"
                  className="text-xs bg-customBlue/60 hover:bg-customBlue px-2 py-2 rounded-lg mt-2"
                >
                  Join the club
                </Link>
              </div>
            )}
          </div>
          {currentUser?.membership && (
            <Link
              to="/createPost"
              className="ml-auto text-sm flex items-center justify-center bg-customBlue/60 hover:bg-customBlue w-[2rem] h-[2rem] rounded-full"
            >
              <span className="">+</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
