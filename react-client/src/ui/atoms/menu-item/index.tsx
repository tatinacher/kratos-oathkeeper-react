import * as React from "react";
import { Link } from "react-router-dom";

interface MenuItemProps {
  path: string;
  title: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ path, title }) => (
  <li>
    <Link to={path}>{title}</Link>
  </li>
);
