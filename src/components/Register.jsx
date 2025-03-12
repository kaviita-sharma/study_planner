import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../slices/authSlice";
import { Navigate, Link } from "react-router-dom";
import InputField from "./common/InputField";
import Button from "./common/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (user) {
    toast.success("Registration successful!");
    return <Navigate to="/" replace />;
  }

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

  // Validation for Step 1: Basic Credentials
  const stepOneValidationSchema = Yup.object({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
  });

  // Validation for Step 2: Personal & Preference Details
  const stepTwoValidationSchema = Yup.object({
    learningStyle: Yup.string().required("Required"),
    preferredStudyTime: Yup.string().required("Required"),
    studySessionDuration: Yup.number().required("Required"),
    breakDuration: Yup.number().required("Required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    if (step === 1) {
      setStep(2);
      setSubmitting(false);
    } else {
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

      dispatch(register(payload))
        .unwrap()
        .then((res) => {
          if (res.Success) {
            toast.success("Registration successful!");
          } else {
            toast.error(res.Message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
      setSubmitting(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <ToastContainer />
      <div className="w-100" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Register</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={
            step === 1 ? stepOneValidationSchema : stepTwoValidationSchema
          }
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, resetForm }) => (
            <Form>
              {step === 1 && (
                <>
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
                  <div className="d-grid gap-2">
                    <Button
                      type="submit"
                      label={isSubmitting ? "Next..." : "Next"}
                    />
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <h4 className="mb-3">User Preferences</h4>
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
                    type="text"
                    placeholder="Enter duration"
                  />
                  <InputField
                    label="Break Duration (minutes)"
                    name="breakDuration"
                    type="text"
                    placeholder="Enter break duration"
                  />
                  <div className="d-flex justify-content-between">
                    <Button
                      type="button"
                      label="Back"
                      onClick={() => {
                        resetForm({ values });
                        setStep(1);
                      }}
                      className="btn btn-secondary"
                    />
                    <Button
                      type="submit"
                      label={isSubmitting ? "Registering..." : "Register"}
                    />
                  </div>
                </>
              )}
            </Form>
          )}
        </Formik>
        <p className="mt-3 text-center">
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </div>
    </div>
  );
};

export default Register;
