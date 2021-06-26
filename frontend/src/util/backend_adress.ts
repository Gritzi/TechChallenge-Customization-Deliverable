const api_base_address = process.env.NODE_ENV === 'production' ? "http://127.0.0.1:8080/" : "http://localhost:8080/";
console.log(api_base_address);

export {api_base_address};