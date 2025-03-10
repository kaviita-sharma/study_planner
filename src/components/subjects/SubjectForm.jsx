import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../common/InputField";
import Button from "../common/Button";

const SubjectForm = ({ onAdd }) => {
  const initialValues = {
    subjectName: "",
    difficultyLevel: "",
    priority: "",
    estimatedCompletionTime: "",
    status: "ToDo",
    startDate: "",
    endDate: "",
  };

  const validationSchema = Yup.object({
    subjectName: Yup.string().required("Subject name is required"),
    difficultyLevel: Yup.string().trim().matches(/^\d*$/, "Must be a number"),
    priority: Yup.string().trim().matches(/^\d*$/, "Must be a number"),
    estimatedCompletionTime: Yup.string()
      .trim()
      .matches(/^\d*$/, "Must be a number"),
    status: Yup.string()
      .oneOf(["ToDo", "InProgress", "Completed"])
      .required("Status is required"),
    startDate: Yup.date().nullable(),
    endDate: Yup.date().nullable(),
  });

  const handleSubmit = (values, { resetForm }) => {
    const newSubject = {
      subjectName: values.subjectName,
      difficultyLevel: values.difficultyLevel
        ? parseInt(values.difficultyLevel, 10)
        : null,
      priority: values.priority ? parseInt(values.priority, 10) : null,
      estimatedCompletionTime: values.estimatedCompletionTime
        ? parseInt(values.estimatedCompletionTime, 10)
        : null,
      status: values.status,
      startDate: values.startDate
        ? new Date(values.startDate).toISOString()
        : null,
      endDate: values.endDate ? new Date(values.endDate).toISOString() : null,
    };

    onAdd(newSubject);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="mb-5">
          {/* Row 1: Subject Name */}
          <div className="row g-3 mb-3">
            <div className="col-md-12">
              <InputField
                label="Subject Name"
                name="subjectName"
                type="text"
                placeholder="Enter subject name"
              />
            </div>
          </div>
          {/* Row 2: Difficulty Level, Priority, Estimated Completion Time */}
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <InputField
                label="Difficulty Level"
                name="difficultyLevel"
                type="text"
                placeholder="1-10"
              />
            </div>
            <div className="col-md-4">
              <InputField
                label="Priority"
                name="priority"
                type="text"
                placeholder="1-10"
              />
            </div>
            <div className="col-md-4">
              <InputField
                label="Est. Completion Time"
                name="estimatedCompletionTime"
                type="text"
                placeholder="Minutes"
              />
            </div>
          </div>
          {/* Row 3: Status, Start Date, End Date */}
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label className="form-label">Status</label>
              <select name="status" className="form-select">
                <option value="ToDo">ToDo</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="col-md-4">
              <InputField label="Start Date" name="startDate" type="date" />
            </div>
            <div className="col-md-4">
              <InputField label="End Date" name="endDate" type="date" />
            </div>
          </div>
          {/* Row 4: Submit Button */}
          <div className="row g-3">
            <div className="col-md-12">
              <Button
                type="submit"
                label={isSubmitting ? "Adding..." : "Add Subject"}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SubjectForm;
