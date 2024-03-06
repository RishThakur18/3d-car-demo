import { Outlet } from "react-router-dom";
import SectionGroup from "./SectionGroup";

export default function RootLayout() {

    return (
        <>
            {/* <SectionGroup className="header-group">
                <></>
            </SectionGroup> */}
            {/* <SectionGroup className="main-group"> */}
                <Outlet />
            {/* </SectionGroup> */}
            {/* <SectionGroup className="footer-group">
                <></>
            </SectionGroup> */}
        </>
    );
}