import {PluggableMap} from "ol";
import {useState} from "react";

function useViewProjection(map: PluggableMap) {

    const [view, setView] = useState(map.getView());
    const [proj, setProj] = useState(map.getView().getProjection());

    map.on("change:view", () => {
        if(view!==map.getView()) {
            setView(map.getView());
            setProj(map.getView().getProjection());
        }
    });

    view.on(["change", "change:projection"], ()=> {
        setProj(map.getView().getProjection());
    });

    return proj;

}

export default useViewProjection;