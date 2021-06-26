const api_base_address = process.env.NODE_ENV === 'production' ? "http://127.0.0.1:8080/" : "http://localhost:8080/";

const calcEndpoint = (endpoint: string) => {
    console.log(api_base_address + endpoint);
    return api_base_address + endpoint;
};

export {api_base_address, calcEndpoint};