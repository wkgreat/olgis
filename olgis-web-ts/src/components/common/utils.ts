export const getServiceAddress = () => {

    const addrInputId = process.env.REACT_APP_HOST_ADDR_INPUT_ID as string;
    const portInputId = process.env.REACT_APP_HOST_PORT_INPUT_ID as string;

    const hostAddressElem = document.getElementById(addrInputId) as HTMLInputElement;
    const hostPortElem = document.getElementById(portInputId) as HTMLInputElement;

    const addr = (hostAddressElem && hostAddressElem.value) || process.env.REACT_APP_DEFAULT_OLGIS_SERVICE_ADDR;
    const port = (hostPortElem && Number(hostPortElem.value)) || process.env.REACT_APP_DEFAULT_OLGIS_SERVICE_PORT;

    return `http://${addr}:${port}`;


};

export const getWebSocketServiceAddress = () => {

    const addrInputId = process.env.REACT_APP_HOST_ADDR_INPUT_ID as string;
    const portInputId = process.env.REACT_APP_HOST_PORT_INPUT_ID as string;

    const hostAddressElem = document.getElementById(addrInputId) as HTMLInputElement;
    const hostPortElem = document.getElementById(portInputId) as HTMLInputElement;

    const addr = (hostAddressElem && hostAddressElem.value) || process.env.REACT_APP_DEFAULT_OLGIS_SERVICE_ADDR;
    const port = (hostPortElem && Number(hostPortElem.value)) || process.env.REACT_APP_DEFAULT_OLGIS_SERVICE_PORT;

    return `ws://${addr}:${port}`;


};

export const genRequestId = (name: string) => {
    const d = new Date().getTime();
    return `request-${name}-${d}`;
};

export const SERVICE_URL = getServiceAddress();
export const WEBSOCKET_URL = getWebSocketServiceAddress();
