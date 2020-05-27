import axios from 'axios';
import {useEffect, useState} from "react";

const useGetRequest = (url, params, deps) => {

    const [ready, setReady] = useState(false);
    const [data, setData] = useState("");

    useEffect(()=>{
        axios.get(url,{params: {...params}})
            .then(res=>{
                setReady(true);
                setData(JSON.stringify(res.data));
            }).catch(()=>{
                setReady(true);
                setData(null);
        });
    }, deps);

    return [ready, data];

};

export default useGetRequest;