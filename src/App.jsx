import { Route, Routes } from "react-router";

import "./App.css";
import ProtectedRoute from "@/components/routes/ProtectRoute";
import AuthRoute from "@/components/routes/AuthRoute";
import LoginPage from "@/components/pages/auth/LoginPage";
import RegisterPage from "@/components/pages/auth/RegisterPage";
import AuthLayout from "@/components/layouts/AuthLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";
import FallBackSpinner from "@/components/common/fall-back-ui-comps/FallBackSpinner";

const ReportHistoryPage = lazy(() =>
  import("@/components/pages/reports-page/ReportHistoryPage")
);

const NotFoundPage = lazy(() => import("@/components/pages/NotFoundPage"));

const UploadReportPage = lazy(() =>
  import("@/components/pages/reports-page/UploadReportPage")
);

const App = () => {
  return (
    <div className="">
      <>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,

            success: {
              iconTheme: {
                primary: "#4ade80", // green
              },
              duration: 1000,
            },
            error: {
              iconTheme: {
                primary: "#ef4444", // red
              },
            },
          }}
        />
      </>
      <Suspense fallback={<FallBackSpinner />}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route
                path="/dashboard/report-history"
                element={<ReportHistoryPage />}
              />
              <Route
                path="/dashboard/upload-report"
                element={<UploadReportPage />}
              />
            </Route>
          </Route>
          <Route element={<AuthRoute />}>
            <Route element={<AuthLayout />}>
              <Route index element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
