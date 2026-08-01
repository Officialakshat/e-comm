import { Outlet } from "react-router-dom";
import Dashboard from "../admin/Dashboard";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

function AdminLayout() {
  return (
    <div className="flex h-screen">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 overflow-auto">
          <Outlet />
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
