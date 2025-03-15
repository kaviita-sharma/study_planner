// src/components/study-sessions/SessionForm.jsx
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "../common/Button";

const SessionForm = ({ prefill, onAdd, onCancel }) => {
  const initialValues = {
    title: prefill?.title || "",
    scheduledStartTime: prefill?.scheduledStartTime
    ? new Date(prefill.scheduledStartTime).toISOString().slice(0, 16)
    : "",
    scheduledEndTime: prefill?.scheduledEndTime
    ? new Date(prefill.scheduledEndTime).toISOString().slice(0, 16)
    : "",
    focusRating: prefill?.focusRating || "",
    comprehensionRating: prefill?.comprehensionRating || "",
    status: prefill?.status || "Scheduled",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    scheduledStartTime: Yup.date()
      .transform((value, originalValue) => (originalValue ? value : null))
      .required("Scheduled start time is required"),
    scheduledEndTime: Yup.date()
      .transform((value, originalValue) => (originalValue ? value : null))
      .required("Scheduled end time is required"),
    focusRating: Yup.number().min(0, "Min 0").max(10, "Max 10").nullable(),
    comprehensionRating: Yup.number().min(0, "Min 0").max(10, "Max 10").nullable(),
    status: Yup.string()
      .oneOf(["Scheduled", "Completed", "Cancelled", "Missed"], "Invalid status")
      .required("status is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Submitting form with values:", values);
    onAdd(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="row g-3">
          <div className="col-md-12">
            <label className="form-label">Title</label>
            <Field
              type="text"
              name="title"
              className="form-control"
              style={{ width: "100%" }}
            />
            {errors.title && touched.title && (
              <div className="text-danger">{errors.title}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Scheduled Start Time</label>
            <Field
              type="datetime-local"
              name="scheduledStartTime"
              className="form-control"
            />
            {errors.scheduledStartTime && touched.scheduledStartTime && (
              <div className="text-danger">{errors.scheduledStartTime}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Scheduled End Time</label>
            <Field
              type="datetime-local"
              name="scheduledEndTime"
              className="form-control"
            />
            {errors.scheduledEndTime && touched.scheduledEndTime && (
              <div className="text-danger">{errors.scheduledEndTime}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Focus Rating</label>
            <Field type="number" name="focusRating" className="form-control" />
            {errors.focusRating && touched.focusRating && (
              <div className="text-danger">{errors.focusRating}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Comprehension Rating</label>
            <Field
              type="number"
              name="comprehensionRating"
              className="form-control"
            />
            {errors.comprehensionRating && touched.comprehensionRating && (
              <div className="text-danger">{errors.comprehensionRating}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">status</label>
            <Field as="select" name="status" className="form-select">
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Missed">Missed</option>
            </Field>
            {errors.status && touched.status && (
              <div className="text-danger">{errors.status}</div>
            )}
          </div>

          <div className="col-12 d-flex">
            <Button
              type="submit"
              label={isSubmitting ? "Submitting..." : "Create Session"}
              className="btn btn-primary"
            />
            {onCancel && (
              <Button
                type="button"
                label="Cancel"
                onClick={onCancel}
                className="btn btn-secondary ms-2"
              />
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SessionForm;
