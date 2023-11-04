import { Navigation } from "@/components/navigation/navigation-sidebar";

const ServerLayout = async({
    children
} : {
    children : React.ReactNode;
}) => {
    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-[72px] flex-col fixed inset-y-0">
            <Navigation/>
            </div>
            <main className="md:pl-[72px] h-full">
                {children}
            </main>

        </div>
    )
}

export default ServerLayout