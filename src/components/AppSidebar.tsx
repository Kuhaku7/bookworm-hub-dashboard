
import { Link, useLocation } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Book, LayoutDashboard, LogOut, User, Users, Library } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const AppSidebar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const menuItems = [
    { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { title: "Livros", path: "/books", icon: Book },
    { title: "Usuários", path: "/users", icon: Users },
    { title: "Empréstimos", path: "/loans", icon: Library },
  ];

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-4 flex items-center gap-2 border-b">
        <div className="flex items-center gap-2">
          <Book size={28} className="text-bookworm-primary" />
          <h1 className="text-xl font-bold text-bookworm-text">
            Biblioteca Novo Saber
          </h1>
        </div>
        <div className="ml-auto">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild 
                    className={cn(
                      isActive(item.path) ? 
                      "bg-bookworm-primary/10 text-bookworm-primary" : 
                      "text-gray-600 hover:bg-bookworm-primary/5"
                    )}
                  >
                    <Link to={item.path} className="flex items-center gap-2">
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-bookworm-primary/20 flex items-center justify-center text-bookworm-primary">
            <User size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user?.name}</span>
            <span className="text-xs text-gray-500">{user?.email}</span>
          </div>
        </div>
        <Button variant="outline" className="w-full flex items-center gap-2" onClick={signOut}>
          <LogOut size={16} />
          <span>Sair</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
