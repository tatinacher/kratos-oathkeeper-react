import * as React from "react";

export const LoginPage: React.FC = () => (
  <>
    <span>Sign in</span>
    <form action="">
      <input type="text" placeholder="login" />
      <input type="password" placeholder="password" />
      <button type="submit">sign in</button>
    </form>
  </>
);
