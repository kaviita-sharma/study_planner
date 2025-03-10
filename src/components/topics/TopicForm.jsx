import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../common/InputField";
import Button from "../common/Button";

const TopicForm = ({ onAdd }) => {
  const initialValues = {
    topicName: "",
    orderIndex: "",
    difficultyLevel: "",
    estimatedCompletionTime: "",
    isActive: true,
  };

  const validationSchema = Yup.object({
    topicName: Yup.string().required("Topic name is required"),
    orderIndex: Yup.string().trim().matches(/^\d*$/, "Must be a number"),
    difficultyLevel: Yup.string().trim().matches(/^\d*$/, "Must be a number"),
    estimatedCompletionTime: Yup.string()
      .trim()
      .matches(/^\d*$/, "Must be a number"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const newTopic = {
      topicName: values.topicName,
      orderIndex: values.orderIndex ? parseInt(values.orderIndex, 10) : null,
      difficultyLevel: values.difficultyLevel
        ? parseInt(values.difficultyLevel, 10)
        : null,
      estimatedCompletionTime: values.estimatedCompletionTime
        ? parseInt(values.estimatedCompletionTime, 10)
        : null,
      isActive: values.isActive,
    };

    onAdd(newTopic);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form>
          <div className="row g-3">
            <div className="col-md-6">
              <InputField
                label="Topic Name"
                name="topicName"
                type="text"
                placeholder="Enter topic name"
              />
            </div>
            <div className="col-md-6">
              <InputField
                label="Order Index"
                name="orderIndex"
                type="text"
                placeholder="Enter order index"
              />
            </div>
            <div className="col-md-6">
              <InputField
                label="Difficulty Level"
                name="difficultyLevel"
                type="text"
                placeholder="1-10"
              />
            </div>
            <div className="col-md-6">
              <InputField
                label="Est. Completion Time"
                name="estimatedCompletionTime"
                type="text"
                placeholder="Minutes"
              />
            </div>
            <div className="col-md-12">
              <div className="form-check">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  className="form-check-input"
                  checked={values.isActive}
                  onChange={() => setFieldValue("isActive", !values.isActive)}
                />
                <label className="form-check-label" htmlFor="isActive">
                  Active
                </label>
              </div>
            </div>
            <div className="col-md-12">
              <Button
                type="submit"
                label={isSubmitting ? "Adding..." : "Add Topic"}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TopicForm;
