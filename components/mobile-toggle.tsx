import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { ServerSidebar } from "./server/server-sidebar";
import { NavigationSidebar } from "./navigation/navigation-sidebar";

export const MobileToggle = ({serverId}:{serverId: string}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size="icon" className="">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div>
        <NavigationSidebar/>
        </div>
        <ServerSidebar serverId={serverId}/>
      </SheetContent>
    </Sheet>
  );
};
