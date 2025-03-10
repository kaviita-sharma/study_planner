import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../slices/authSlice";
import { Navigate, Link } from "react-router-dom";
import InputField from "./common/InputField";
import Button from "./common/Button";

const Register = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    learningStyle: "",
    preferredStudyTime: "",
    studySessionDuration: "",
    breakDuration: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    learningStyle: Yup.string().required("Required"),
    preferredStudyTime: Yup.string().required("Required"),
    studySessionDuration: Yup.number().required("Required"),
    breakDuration: Yup.number().required("Required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const payload = {
      username: values.username,
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      preferences: {
        learningStyle: values.learningStyle,
        preferredStudyTime: values.preferredStudyTime,
        studySessionDuration: parseInt(values.studySessionDuration, 10),
        breakDuration: parseInt(values.breakDuration, 10),
      },
    };
    dispatch(register(payload));
    setSubmitting(false);
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mt-4">
      <h2>Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              label="Username"
              name="username"
              type="text"
              placeholder="Enter username"
            />
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
            <InputField
              label="First Name"
              name="firstName"
              type="text"
              placeholder="Enter first name"
            />
            <InputField
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Enter last name"
            />
            <hr className="my-3" />
            <h4>User Preferences</h4>
            <InputField
              label="Learning Style"
              name="learningStyle"
              type="text"
              placeholder="e.g., Visual, Auditory, Kinesthetic"
            />
            <InputField
              label="Preferred Study Time"
              name="preferredStudyTime"
              type="text"
              placeholder="e.g., Morning, Evening"
            />
            <InputField
              label="Study Session Duration (minutes)"
              name="studySessionDuration"
              type="number"
              placeholder="Enter duration"
            />
            <InputField
              label="Break Duration (minutes)"
              name="breakDuration"
              type="number"
              placeholder="Enter break duration"
            />
            <Button
              type="submit"
              label={loading ? "Registering..." : "Register"}
              className="mb-3"
            />
            {error && <div className="text-danger mt-2">{error}</div>}
          </Form>
        )}
      </Formik>
      <p className="mt-3">
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
};

export default Register;
