import * as React from "react";
import { MenuItem } from "../../atoms";

interface MenuItemProps {
  path: string;
  title: string;
}

export const Menu: React.FC<{ menu: MenuItemProps[] }> = ({ menu }) => (
  <nav>
    <ul>
      {menu.map(({ path, title }: MenuItemProps) => (
        <MenuItem path={path} title={title} />
      ))}
    </ul>
  </nav>
);
