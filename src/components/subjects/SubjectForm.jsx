import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import InputField from "../common/InputField";
import Button from "../common/Button";

const SubjectForm = ({ onSubmit, existingSubject, onClose }) => {
  const initialValues = {
    subjectName: existingSubject?.subjectName || "",
    difficultyLevel: existingSubject?.difficultyLevel?.toString() || "",
    priority: existingSubject?.priority?.toString() || "",
    estimatedCompletionTime:
      existingSubject?.estimatedCompletionTime?.toString() || "",
    status: existingSubject?.status || "ToDo",
    startDate: existingSubject?.startDate
      ? new Date(existingSubject.startDate).toISOString().split("T")[0]
      : "",
    endDate: existingSubject?.endDate
      ? new Date(existingSubject.endDate).toISOString().split("T")[0]
      : "",
  };

  const validationSchema = Yup.object({
    subjectName: Yup.string().required("Subject name is required"),
    difficultyLevel: Yup.number().nullable().typeError("Must be a number"),
    priority: Yup.number().nullable().typeError("Must be a number"),
    estimatedCompletionTime: Yup.number().nullable().typeError("Must be a number"),
    status: Yup.string()
      .oneOf(["ToDo", "InProgress", "Completed"])
      .required("Status is required"),
    startDate: Yup.date().nullable(),
    endDate: Yup.date()
      .nullable()
      .min(Yup.ref("startDate"), "End date must be after start date"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const updatedSubject = {
      ...values,
      difficultyLevel: values.difficultyLevel ? parseInt(values.difficultyLevel, 10) : null,
      priority: values.priority ? parseInt(values.priority, 10) : null,
      estimatedCompletionTime: values.estimatedCompletionTime
        ? parseInt(values.estimatedCompletionTime, 10)
        : null,
      startDate: values.startDate ? new Date(values.startDate).toISOString() : null,
      endDate: values.endDate ? new Date(values.endDate).toISOString() : null,
      id: existingSubject?.id || null, // Preserve ID for editing
    };

    onSubmit(updatedSubject);
    resetForm();
    onClose(); // Close modal after submission
  };
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="mb-5">
          {/* Row 1: Subject Name */}
          <div className="row g-3 mb-3">
            <div className="col-md-12">
              <InputField label="Subject Name" name="subjectName" type="text" placeholder="Enter subject name" />
            </div>
          </div>

          {/* Row 2: Difficulty Level, Priority, Estimated Completion Time */}
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <InputField label="Difficulty Level" name="difficultyLevel" type="text" placeholder="1-10" />
            </div>
            <div className="col-md-4">
              <InputField label="Priority" name="priority" type="text" placeholder="1-10" />
            </div>
            <div className="col-md-4">
              <InputField label="Est. Completion Time" name="estimatedCompletionTime" type="text" placeholder="Minutes" />
            </div>
          </div>

          {/* Row 3: Status, Start Date, End Date */}
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label className="form-label">Status</label>
              <Field as="select" name="status" className="form-select">
                <option value="ToDo">To Do</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </Field>
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
            <div className="col-md-12 d-flex justify-content-between">
              <Button type="submit" label={isSubmitting ? "Saving..." : existingSubject ? "Update Subject" : "Add Subject"} />
              <Button type="button" label="Cancel" className="btn btn-secondary" onClick={onClose} />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SubjectForm;
