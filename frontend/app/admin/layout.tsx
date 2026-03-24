import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/Sidebar";
import GoBackBtn from "@/components/GoBackBtn";

export default function Layout({ children }: { children: any }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-10">
        <GoBackBtn />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
