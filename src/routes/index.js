import Reportcheck from "../pages/reportcheck/Reportcheck";
import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Addcirtificate from "../pages/addcirtificate/Addcirtificate";
import Dashboard from "../pages/dashboard/Dashboard";
import Viewcirtificate from "../pages/viewcirtificate/Viewcirtificate";
import Login from "../pages/login/Login";
import ProtectedRoutes from "./ProtectedRoutes";
// import UnRestrictedRoutes from "./UnRestrictedRoutes";
import Editcirtificate from "../pages/editcirtificate/Editcirtificate";
import Reportdetail from "../pages/reportdetail/Reportdetail";
import AddGemCertificate from "../pages/addGemCertificate/AddGemCertificate";
import EditGemCertificate from "../pages/editGemCertificate/EditGemCertificate";

// importing components for routes

const AppRoutes = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="admin" element={<Login />} />
          <Route path="/" element={<Reportcheck />} />
          <Route path="report/:id" element={<Reportdetail />} />
          {/* <Route path="/" element={<ProtectedRoutes><MainLayout /></ProtectedRoutes> }> */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoutes>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoutes>
            }
          />
          <Route
            path="add-certificate"
            element={
              <ProtectedRoutes>
                <MainLayout>
                  <Addcirtificate />
                </MainLayout>
              </ProtectedRoutes>
            }
          />
          <Route
            path="add-gem-certificate"
            element={
              <ProtectedRoutes>
                <MainLayout>
                  <AddGemCertificate />
                </MainLayout>
              </ProtectedRoutes>
            }
          />
          <Route
            path="edit-certificate/:id"
            element={
              <ProtectedRoutes>
                <MainLayout>
                  <Editcirtificate />
                </MainLayout>
              </ProtectedRoutes>
            }
          />
          <Route
            path="edit-gem-certificate/:id"
            element={
              <ProtectedRoutes>
                <MainLayout>
                  <EditGemCertificate />
                </MainLayout>
              </ProtectedRoutes>
            }
          />
          <Route
            path="view-certificate/:id"
            element={
              <ProtectedRoutes>
                <MainLayout>
                  <Viewcirtificate />
                </MainLayout>
              </ProtectedRoutes>
            }
          />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default AppRoutes;
