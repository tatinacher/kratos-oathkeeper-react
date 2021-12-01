import axios, { Method } from "axios";

export type RequestProps = {
  method: Method;
  url: string;
  params?: object;
};

export const request = async ({
  url,
  method,
  params = {},
}: RequestProps): Promise<any> => {
  const request =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:4455/" + url
      : url;
  let headers: any = {
    Accept: "application/json, text/plain, */*",
  };

  const options =
    method === "get"
      ? { headers, method, url: request, withCredentials: true }
      : {
          headers,
          method,
          url: request,
          data: JSON.stringify(params),
          withCredentials: true,
        };

  try {
    const { data } = await axios(options);
    console.log(data);
    return data;
  } catch (error: any) {
    console.log("req err");

    throw new Error(error);
  }
};
