import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/authSlice";
import { Navigate, Link } from "react-router-dom";
import InputField from "./common/InputField";
import Button from "./common/Button";

const Login = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(login(values));
    setSubmitting(false);
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="Enter email"
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter password"
            />
            <Button
              type="submit"
              label={loading ? "Logging in..." : "Login"}
              className="mb-3"
            />
            {error && <div className="text-danger mt-2">{error}</div>}
          </Form>
        )}
      </Formik>
      <p className="mt-3">
        Don&apos;t have an account? <Link to="/register">Register here</Link>.
      </p>
    </div>
  );
};

export default Login;
