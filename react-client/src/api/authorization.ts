import { request } from "../lib/request";

export const registration = (): Promise<any> =>
  request({
    url: `self-service/registration/browser`,
    method: "get",
  });

export const reg = ({
  id,
  params,
}: {
  id: string;
  params: any;
}): Promise<any> =>
  request({
    url: `self-service/registration?flow=${id}`,
    method: "post",
    params,
  });

export const whoami = (): Promise<any> =>
  request({
    url: `/sessions/whoami`,
    method: "get",
  });
