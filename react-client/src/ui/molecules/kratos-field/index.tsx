import * as React from "react";
import { KratosLabel } from "../../atoms";

interface AttributeProps {
  disabled: boolean;
  name: string;
  node_type: string;
  required: boolean;
  type: string;
}

interface MetaProps {
  id: number;
  text: string;
  type: string;
}
interface MessagesProps {
  context?: {
    reason: string;
  };
  id: number;
  text: string;
  type: string;
}

interface KratosFieldProps {
  attributes?: AttributeProps;
  group?: "string";
  messages?: Array<MessagesProps>;
  meta?: { label: MetaProps };
  handleChange: any;
  fieldType?: "input";
}

export const KratosField: React.FC<KratosFieldProps> = ({
  attributes,
  group,
  messages,
  meta,
  handleChange,
  fieldType,
}) => {
  let messagesText;
  if (fieldType !== "input" || !attributes) {
    return null;
  }

  const { disabled, name, required, type } = attributes;

  if (type === "submit") {
    return <button type="submit">Sign up</button>;
  }

  if (messages?.length !== 0) {
    messagesText = messages?.map((message) => {
      return <div key={message.id}>{message.text}</div>;
    });
  }

  if (meta?.label) {
    return (
      <KratosLabel id={meta.label.id} text={meta.label.text}>
        <input
          disabled={disabled}
          name={name}
          onChange={handleChange}
          required={required}
          type={type}
        />
        <span style={{ display: "block" }}>{messagesText}</span>
      </KratosLabel>
    );
  }

  return (
    <div>
      <input
        disabled={disabled}
        name={name}
        onChange={handleChange}
        required={required}
        type={type}
      />
      <span style={{ display: "block" }}>{messagesText}</span>
    </div>
  );
};
