import * as React from "react";
import { KratosField } from "../../molecules";

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

interface FieldProps {
  attributes?: AttributeProps;
  group?: "string";
  messages?: Array<MessagesProps>;
  meta?: { label: MetaProps };
  onSubmit: any;
  type?: "input";
}

interface KratosFormProps {
  fields: Array<FieldProps>;
  messages?: Array<MessagesProps>;
  onSubmit: any;
  handleChange?: any;
  title?: string;
}

export const KratosForm: React.FC<KratosFormProps> = ({
  fields,
  messages,
  onSubmit,
  handleChange,
  title,
}) => {
  const messageText = messages?.map((message: any, key: any) => (
    <div data-id={message.id} key={key}>
      {message.text}
    </div>
  ));

  return (
    <div>
      {title}
      <form onSubmit={onSubmit}>
        <div>{messageText}</div>
        {fields.map(({ attributes, group, messages, meta, type }, key) => (
          <KratosField
            attributes={attributes}
            group={group}
            messages={messages}
            meta={meta}
            handleChange={handleChange}
            fieldType={type}
            key={key}
          />
        ))}
      </form>
    </div>
  );
};
