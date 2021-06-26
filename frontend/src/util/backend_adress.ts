const api_base_address = process.env.NODE_ENV === 'production' ? window.location.origin : "http://localhost:8080/";

console.log(api_base_address);

export {api_base_address};