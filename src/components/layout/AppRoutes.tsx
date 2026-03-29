import { Routes, Route } from "react-router";
import CreateExpensesForm from "@/components/expenses/CreateExpensesForm";
import AuthLayout from "./AuthLayout";
import {
  authRoutes,
  dashboardsRoutes,
  expesnsesRoutes,
} from "@/data/routePaths";
import ExpensesListPage from "@/pages/Expenses/ExpensesListPage";
import RegisterPage from "@/pages/Auth/RegisterPage";
import LoginPage from "@/pages/Auth/LoginPage";
import Layout from "./Layout";
import DashboardPage from "@/pages/Dashboard/DashboardPage";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route index element={<CreateExpensesForm />} />
        <Route path={expesnsesRoutes.list} element={<ExpensesListPage />} />
        <Route path={dashboardsRoutes.index} element={<DashboardPage />} />
      </Route>
      {/* Public Routes */}
      <Route element={<Layout />}>
        <Route path={authRoutes.register} element={<RegisterPage />} />
        <Route path={authRoutes.login} element={<LoginPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
