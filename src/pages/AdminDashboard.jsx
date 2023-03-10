import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Header, Footer, ToastNotification } from "../components";
import { adminGetUsers, adminGetVinyls } from "../redux/features/adminSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { users, vinyls, adminError } = useSelector(
    (state) => state.adminReducer
  );

  useEffect(() => {
    if (!users.length) {
      dispatch(adminGetUsers());
    }
    if (!vinyls.length) {
      dispatch(adminGetVinyls());
    }
  }, []);

  if (adminError) {
    return (
      <ToastNotification type={"error"} toastMessage={adminError.message} />
    );
  }

  return (
    <>
      <Header headerClass={"flex text-xl justify-between p-5 bg-shade-9"} />
      <div className="flex-1 bg-shade-7 ">
        {`Users loaded: ${users.length}`}
        {`Vinyls loaded: ${vinyls.length}`}
      </div>
      <Footer twClass={"p-5 text-white flex justify-center bg-shade-9 "} />
    </>
  );
};

export default AdminDashboard;
