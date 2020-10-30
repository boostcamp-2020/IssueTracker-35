const BASE_URL = process.env.NODE_ENV === "production"
    ? "http://118.67.132.70:3000"
    : "http://127.0.0.1:3000";

export default BASE_URL;
