import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import InputField from "./common/InputField";
import Button from "./common/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  // Show toast error if error changes
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/subjects");
      }, 1000);
    }
  }, [user, navigate]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(login(values))
      .unwrap()
      .then((res) => {
        if (!res.Success) {
          toast.error(res.Message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
    setSubmitting(false);
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <ToastContainer />
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
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
              <div className="d-grid gap-2">
                <Button
                  type="submit"
                  label={loading ? "Logging in..." : "Login"}
                />
              </div>
            </Form>
          )}
        </Formik>
        <p className="mt-3 text-center">
          Don't have an account? <Link to="/register">Register here</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;
