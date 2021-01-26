import md5 from "md5";

export const API_URL = process.env.REACT_APP_MARVEL_API_BASE;
export const PUBLIC_KEY = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
export const PRIVATE_KEY = process.env.REACT_APP_MARVEL_PRIVATE_KEY;

export const getApi = (resource = "") => {
	const ts = new Date().getTime();
	const hash = md5(`${ts}${PRIVATE_KEY}${PUBLIC_KEY}`);
	const url = `${API_URL}${resource}&apikey=${PUBLIC_KEY}&ts=${ts}&hash=${hash}`;

	return url;
};

export default getApi;