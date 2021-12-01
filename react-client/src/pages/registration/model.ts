import {
  combine,
  createEffect,
  createEvent,
  createStore,
  guard,
} from "effector";
import { registration } from "../../api";
import { reg } from "../../api/authorization";

export const startRegistrationFlow = createEvent();
export const onSubmit = createEvent<any>();
export const setForm = createEvent<any>();

export const register = createEffect<any, any>();
export const send_reg_form = createEffect<any, any>();

register.use(registration);
send_reg_form.use(reg);

export const $flow_id = createStore<string>("");
export const $user = createStore<any>({});
export const $page = createStore<any>("");
export const $id = createStore<string>("");
export const $requested_flow_id = createStore<boolean>(false);

$page.on([register.done, send_reg_form.done], (_, payload: any) => {
  console.log("result", payload);
  return payload.result;
});

$id.on([register.done, send_reg_form.done], (state, { result }: any) => {
  if (state === "") {
    return result.id;
  }
});

$requested_flow_id.on(register.done, () => true);

$user.on(setForm, (state: any, payload: any) => {
  return { ...state, [payload.name]: payload.value };
});

$user.on([register.done, send_reg_form.done], (state: any, payload: any) => {
  let user: any = {};
  payload?.result?.ui?.nodes?.forEach(({ attributes }: any) => {
    user[attributes.name] = attributes.value;
  });
  return user;
});

// $user.watch((user) => console.log(user));
// $id.watch((user) => console.log(user));

guard({
  clock: startRegistrationFlow,
  source: $id,
  filter: (id) => true,
  target: register,
});

// $id.watch((id) => console.log(id));

// guard({
//   source: $id,
//   filter: (id) => id !== "",
//   target: register,
// });

// onSubmit.watch((event) => {
//   console.log(event.target);
// });

guard({
  clock: onSubmit,
  source: combine({ id: $id, params: $user }),
  filter: (field: any) => true,
  target: send_reg_form.prepend(({ id, params }: any) => {
    console.log(id, params);
    return { id, params };
  }),
});
