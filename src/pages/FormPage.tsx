import React from "react";
import Form from "../components/Form";

type FormPageProps = {};

const FormPage: React.FC<FormPageProps> = ({}) => {
  return (
    <div className="Page">
      <h1>Form</h1>

      <Form />
    </div>
  );
};

export default FormPage;
