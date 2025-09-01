import { useState } from 'react';

export const useSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const openSidebar = () => setSidebarOpen(true);

  return {
    isSidebarOpen,
    toggleSidebar,
    closeSidebar,
    openSidebar
  };
};
