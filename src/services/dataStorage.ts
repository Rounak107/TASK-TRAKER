import Cookies from "universal-cookie";

const cookies = new Cookies();

export const dataStorage = {
  setItem: (key: string, value: unknown) => {
    cookies.set(key, value, { path: "/" });
  },
  getItem: (key: string) => {
    return cookies.get(key);
  },
  removeItem: (key: string) => {
    cookies.remove(key);
  },
};
