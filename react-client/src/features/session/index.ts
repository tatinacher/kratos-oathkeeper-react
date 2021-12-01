import { createEffect, createEvent, createStore, forward } from "effector";
import { whoami } from "../../api/authorization";

export const $session = createStore<null | any>(null);
export const $isReady = createStore(false);

export const initiate = createEvent();

export const getSession = createEffect();

getSession.use(whoami);

$session.on(getSession.done, (_, payload: any) => {
  if (payload.result.error) {
    return;
  }
  if (payload.result) {
    return payload.result;
  }
});
$isReady.on(getSession.finally, () => true);

forward({
  from: initiate,
  to: getSession,
});
