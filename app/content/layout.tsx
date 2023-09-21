const Layout = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    return (
        <div className="container mx-auto px-4">
            <div className="m-3 border border-black rounded">{children}</div>
        </div>
    );
};

export default Layout;
