import './styles/main.scss';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserFromLocalStorage } from './redux/authSlice';
import { RootState } from './redux/authStore';
import PrivateRoute from './components/PrivateRoute';

const ManageEmp = lazy(() => import('./pages/ManageEmp/ManageEmp'));
const HomeDashBoard = lazy(() => import('./pages/Dashboard/HomeDashBoard'));
const AdminDashBoard = lazy(() => import('./pages/Dashboard/AdminDashBoard'));
const SignIn = lazy(() => import('./pages/Auth/SignIn'));
const FindUser = lazy(() => import('./pages/Auth/FindUser'));
const SignUp = lazy(() => import('./pages/Auth/SignUp'));
const Mypage = lazy(() => import('./pages/MyPage'));
const SignUpRequest = lazy(() => import('./pages/SignUpRequest'));
const MyTasks = lazy(() => import('./pages/MyTasks'));
const ManageUser = lazy(() => import('./pages/ManageUser'));
const IssueAd = lazy(() => import('./pages/IssueAd/IssueAd'));
const IssueAdResult = lazy(() => import('./pages/IssueAd/IssueAdResult'));
const SameAd = lazy(() => import('./pages/SameAd/SameAd'));
const SameAdResult = lazy(() => import('./pages/SameAd/SameAdResult'));
const ManageTask = lazy(() => import('./pages/ManageEmp/ManageTask'));
const ManageEmpDetail = lazy(() => import('./pages/ManageEmp/ManageEmpDetail'));
const ManageTaskDone = lazy(() => import('./pages/ManageEmp/ManageTaskDone'));
const ErrorPages = lazy(() => import('./pages/ErrorPages'));

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/find-user" element={<FindUser />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Layout>
                <Routes>
                  <Route path="/dashboard" element={<HomeDashBoard />} />
                  <Route path="/dashboard/admin" element={<AdminDashBoard />} />
                  <Route path="admin/manage-emp" element={<ManageEmp />} />
                  <Route path="/employee/:employeeId" element={<ManageEmpDetail />} />
                  <Route path="/admin/manage-task" element={<ManageTask />} />
                  <Route path="/admin/manage-task-done" element={<ManageTaskDone />} />
                  <Route path="/mypage" element={<Mypage />} />
                  <Route path="/admin/approve-user" element={<SignUpRequest />} />
                  <Route path="/admin/manage-user" element={<ManageUser />} />
                  <Route path="/my-task" element={<MyTasks />} />
                  <Route path="/same-ad" element={<SameAd />} />
                  <Route path="/same-ad/result" element={<SameAdResult />} />
                  <Route path="/issue-ad" element={<IssueAd />} />
                  <Route path="/issue-ad/result" element={<IssueAdResult />} />
                  <Route path="*" element={<ErrorPages />} />
                </Routes>
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default App;
