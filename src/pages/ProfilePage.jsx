import { useSelector, useDispatch } from "react-redux";
import {
  Header,
  Footer,
  UserProfileCard,
  UserProfileForm,
  UserCart,
  OrderHistory,
  ToastNotification,
} from "../components";
import {
  clearErrorMessage,
  clearSuccessMessage,
} from "../redux/features/authSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const {
    authReducer: {
      firstName,
      lastName,
      username,
      email,
      cart,
      orders,
      img,
      error,
      message,
    },
  } = useSelector((state) => state);

  return (
    <>
      <Header headerClass={"flex text-xl justify-between p-5 bg-shade-9"} />
      <div className="flex-1 bg-shade-7">
        <div className="flex flex-col sm:flex-row p-5 gap-5">
          <div className="flex flex-1 flex-col items-center gap-5">
            <UserProfileCard
              user={{ firstName, lastName, username, email, img }}
            />
            <OrderHistory />
            <UserCart orders={orders} cart={cart} controls title images />
          </div>
          <div className="flex flex-1 flex-col items-center gap-5">
            <UserProfileForm />
          </div>
        </div>
      </div>
      <Footer twClass={"p-5 text-white flex justify-center bg-shade-9"} />

      {message && (
        <ToastNotification
          clear={() => dispatch(clearSuccessMessage())}
          type="success"
          toastMessage={message}
        />
      )}

      {error && message && (
        <ToastNotification
          clear={() => dispatch(clearErrorMessage())}
          type="error"
          toastMessage={message}
        />
      )}
    </>
  );
};

export default ProfilePage;
