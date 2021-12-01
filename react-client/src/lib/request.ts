export type RequestProps = {
  method: string;
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

  let formBody: any = [];
  for (const [key, value] of Object.entries(params)) {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(value);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  if (method === "post") {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    // headers["Access-Control-Allow-Credentials"] = "true";
  }

  const options =
    method === "get"
      ? { headers, method, credentials: "include" as RequestCredentials }
      : {
          headers,
          method,
          body: formBody,
          credentials: "include" as RequestCredentials,
          // mode: "no-cors" as RequestMode,
        };

  try {
    const data = await fetch(request, options);
    const res = await data.json();

    return res;
  } catch (error: any) {
    console.log("req err", error);

    throw new Error(error);
  }
};
