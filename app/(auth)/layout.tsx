const AuthLayout = ({children} : {children : React.ReactNode}) => {
    return ( 
        <div className="flex items-center bg-red-300 justify-center h-full">
            {children}
        </div>
     );
}
 
export default AuthLayout;