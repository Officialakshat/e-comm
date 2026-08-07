import { Outlet } from "react-router-dom";
import AdminHeader from "../admin/components/AdminHeader";
import AdminSidebar from "../admin/components/AdminSidebar";
import { useState } from "react";

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false); // Desktop collapse
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile
  return (
    <div className="flex h-screen">
      <AdminSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
