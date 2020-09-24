import React, {FC, ReactNode} from "react";
import ReactDOM from "react-dom";

interface PortalToBodyProps {
    children: ReactNode
}

const PortalToBody: FC<PortalToBodyProps> = ({children}) => {
    return ReactDOM.createPortal(
        children,
        document.getElementsByTagName("body")[0]
        //document.getElementById('root') as Element
    );
};

export default PortalToBody;