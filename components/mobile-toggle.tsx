import { Menu } from "lucide-react"

import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { Navigation } from "./navigation/navigation-sidebar"
import { ServerSidebar } from "./server/server-sidebar"
export const MobileToggle = ({serverId} :{serverId : string}) => {
    console.log("mobile toggle server id", serverId)
    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className = "md:hidden">
                    <Menu/>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className = "p-0 flex gap-0">
                <div className="w-[72px]">
                <Navigation/>
                </div>
                <div className="hidden md:flex flex-col h-full w-60 z-20 inset-y-0 fixed">
                <ServerSidebar serverId={serverId}/>
                </div>
            </SheetContent>
        </Sheet>
    )
}