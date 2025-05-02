import React, { useEffect, useState } from "react";

type FormProps = {};

type FormData = {
  username: string | null;
  password: string | null;
};

const Form: React.FC<FormProps> = ({}) => {
  const [formData, setFormData] = useState<FormData>({
    username: null,
    password: null,
  });

  const [isValid, setIsValid] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [formTouched, setFormTouched] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    const isUsernameValid =
      typeof formData.username === "string" && formData.username.length > 0;

    const isPasswordValid =
      typeof formData.password === "string" && formData.password.length > 0;

    const isFormValid = formTouched && isUsernameValid && isPasswordValid;

    setIsValid(isFormValid);
  }, [formData, formTouched]);

  const handleChange = (
    field: keyof FormData,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setFormSubmitted(false);

      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const result = true;

      if (result) {
        setError(null);
        setLoggedInUser(formData.username);
        setFormData({ username: null, password: null });
      } else {
        setError("Form is not valid");
        setLoggedInUser(null);
      }

      setFormSubmitted(true);

      setLoading(false);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("An error occurred while submitting the form");
      setLoading(false);
    }
  };

  return (
    <div>
      {loggedInUser ? (
        <p className="success" data-testid="welcome-message">
          Welcome {loggedInUser}
        </p>
      ) : (
        <form
          className="Form"
          onSubmit={handleSubmit}
          onBlur={() => setFormTouched(true)}
          data-testid="form"
        >
          <input
            type="text"
            placeholder="username"
            onChange={(e) => handleChange("username", e)}
          />

          <input
            type="password"
            placeholder="password"
            onChange={(e) => handleChange("password", e)}
          />

          <button type="submit" disabled={!isValid || loading}>
            {loading ? "Loading..." : "Submit"}
          </button>

          {!isValid && formTouched && (
            <p className="valid">Form is not valid</p>
          )}

          {formSubmitted && !error && (
            <p className="success" data-testid="submit-success-message">
              Form submitted successfully
            </p>
          )}

          <p
            className="error"
            data-testid="error-message"
            style={{ visibility: formTouched && error ? "visible" : "hidden" }}
          >
            {error}
          </p>
        </form>
      )}
    </div>
  );
};

export default Form;
