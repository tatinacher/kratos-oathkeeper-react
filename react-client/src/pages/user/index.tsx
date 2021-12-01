import { reflect } from "@effector/reflect";
import * as React from "react";
import { $session, initiate } from "../../features/session";

export const UserPageBase: React.FC<{ session: any }> = ({ session }) => {
  return (
    <>
      <div>User page</div>
      <div>{JSON.stringify(session)}</div>
    </>
  );
};

export const UserPage = reflect({
  view: UserPageBase,
  bind: {
    session: $session,
  },
  hooks: {
    mounted: initiate,
  },
});
