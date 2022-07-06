import Footer from "./Footer";
import Header from "./Header";
import SidePanel from "./SidePanel";

interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <div>
            <Header />
            <div className="border-x">
                <SidePanel>
                    {children}
                </SidePanel>
            </div>
            <Footer />
        </div>
    )
}