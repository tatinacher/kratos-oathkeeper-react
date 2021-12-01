import * as React from "react";
import { reflect } from "@effector/reflect";
import { startRegistrationFlow, $page, onSubmit, setForm, $id } from "./model";
import { KratosForm } from "../../ui/organisms";

export const RegistrationPageBase: React.FC<any> = ({
  onSubmit,
  page,
  setForm,
  id,
}) => {
  if (!page.ui || !page.ui.nodes || page.ui.nodes.length === 0) {
    return null;
  }

  const { nodes } = page.ui;

  const handleChange = (event: any) => {
    console.log("handle change");
    const name = event.target.name;
    const value = event.target.value;
    setForm({ name, value });
  };
  return (
    <KratosForm
      title="Sign up!"
      fields={nodes}
      handleChange={handleChange}
      onSubmit={onSubmit}
    />
  );
};

export const RegistrationPage = reflect({
  view: RegistrationPageBase,
  bind: {
    page: $page,
    onSubmit,
    setForm,
    id: $id,
  },
  hooks: {
    mounted: startRegistrationFlow,
  },
});

onSubmit.watch((event) => event.preventDefault());
