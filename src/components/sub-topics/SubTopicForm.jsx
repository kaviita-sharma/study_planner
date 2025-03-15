import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../common/InputField";
import Button from "../common/Button";

const SubTopicForm = ({ onAdd, selectedSubtopic}) => {

  const initialValues = {
    subTopicName: selectedSubtopic?.subTopicName || "",
    orderIndex: selectedSubtopic?.orderIndex?.toString() || "",
    difficultyLevel: selectedSubtopic?.difficultyLevel?.toString() || "",
    estimatedCompletionTime: selectedSubtopic?.estimatedCompletionTime?.toString() || "",
    isActive: selectedSubtopic?.isActive ?? true,
  };

  const validationSchema = Yup.object({
    subTopicName: Yup.string().required("Subtopic name is required"),
    difficultyLevel: Yup.string().trim().matches(/^\d*$/, "Must be a number"),
    estimatedCompletionTime: Yup.string()
      .trim()
      .matches(/^\d*$/, "Must be a number"),
    orderIndex: Yup.string().trim().matches(/^\d*$/, "Must be a number"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const newSubTopic = {
      subTopicName: values.subTopicName,
      difficultyLevel: values.difficultyLevel
        ? parseInt(values.difficultyLevel, 10)
        : null,
      estimatedCompletionTime: values.estimatedCompletionTime
        ? parseInt(values.estimatedCompletionTime, 10)
        : null,
      orderIndex: values.orderIndex ? parseInt(values.orderIndex, 10) : null,
      isActive: values.isActive,
    };
    onAdd(newSubTopic);
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
                label="Subtopic Name"
                name="subTopicName"
                type="text"
                placeholder="Enter subtopic name"
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
                  id="isActiveSub"
                  name="isActive"
                  className="form-check-input"
                  checked={values.isActive}
                  onChange={() => setFieldValue("isActive", !values.isActive)}
                />
                <label className="form-check-label" htmlFor="isActiveSub">
                  Active
                </label>
              </div>
            </div>
            <div className="col-md-12">
              <Button
                type="submit"
                label={isSubmitting ? "Saving..." : selectedSubtopic ? "Update Topic" : "Add Topic"}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SubTopicForm;
