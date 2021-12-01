import * as React from "react";
import { Link } from "react-router-dom";

export const MainPage: React.FC = () => (
  <>
    Main page
    <Link to="/login">Login</Link>
  </>
);
