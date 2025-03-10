import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../common/InputField";
import Button from "../common/Button";

const SessionForm = ({ onAdd }) => {
  const initialValues = {
    subjectId: "",
    topicId: "",
    subTopicId: "",
    notes: "",
    scheduledStartTime: "",
    scheduledEndTime: "",
    actualStartTime: "",
    actualEndTime: "",
    status: "Scheduled",
    focusRating: "",
    comprehensionRating: "",
  };

  const validationSchema = Yup.object({
    subjectId: Yup.string().trim().matches(/^\d*$/, "Must be a number"),
    topicId: Yup.string().trim().matches(/^\d*$/, "Must be a number"),
    subTopicId: Yup.string().trim().matches(/^\d*$/, "Must be a number"),
    notes: Yup.string(),
    scheduledStartTime: Yup.date().required("Scheduled start time is required"),
    scheduledEndTime: Yup.date().required("Scheduled end time is required"),
    actualStartTime: Yup.date().nullable(),
    actualEndTime: Yup.date().nullable(),
    status: Yup.string()
      .oneOf(["Scheduled", "InProgress", "Completed"])
      .required("Status is required"),
    focusRating: Yup.string().trim().matches(/^\d*$/, "Must be a number"),
    comprehensionRating: Yup.string()
      .trim()
      .matches(/^\d*$/, "Must be a number"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const newSession = {
      subjectId: values.subjectId ? parseInt(values.subjectId, 10) : null,
      topicId: values.topicId ? parseInt(values.topicId, 10) : null,
      subTopicId: values.subTopicId ? parseInt(values.subTopicId, 10) : null,
      notes: values.notes,
      scheduledStartTime: new Date(values.scheduledStartTime).toISOString(),
      scheduledEndTime: new Date(values.scheduledEndTime).toISOString(),
      actualStartTime: values.actualStartTime
        ? new Date(values.actualStartTime).toISOString()
        : null,
      actualEndTime: values.actualEndTime
        ? new Date(values.actualEndTime).toISOString()
        : null,
      status: values.status,
      focusRating: values.focusRating ? parseInt(values.focusRating, 10) : null,
      comprehensionRating: values.comprehensionRating
        ? parseInt(values.comprehensionRating, 10)
        : null,
    };

    onAdd(newSession);
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
          <div className="row g-3">
            {/* IDs */}
            <div className="col-md-4">
              <InputField
                label="Subject ID"
                name="subjectId"
                type="text"
                placeholder="Enter subject ID"
              />
            </div>
            <div className="col-md-4">
              <InputField
                label="Topic ID"
                name="topicId"
                type="text"
                placeholder="Enter topic ID"
              />
            </div>
            <div className="col-md-4">
              <InputField
                label="Subtopic ID"
                name="subTopicId"
                type="text"
                placeholder="Enter subtopic ID"
              />
            </div>
            {/* Notes */}
            <div className="col-md-12">
              <InputField
                label="Notes"
                name="notes"
                type="text"
                placeholder="Enter session notes"
              />
            </div>
            {/* Scheduled times */}
            <div className="col-md-6">
              <label className="form-label">Scheduled Start Time</label>
              <InputField name="scheduledStartTime" type="datetime-local" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Scheduled End Time</label>
              <InputField name="scheduledEndTime" type="datetime-local" />
            </div>
            {/* Actual times (optional) */}
            <div className="col-md-6">
              <label className="form-label">Actual Start Time</label>
              <InputField name="actualStartTime" type="datetime-local" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Actual End Time</label>
              <InputField name="actualEndTime" type="datetime-local" />
            </div>
            {/* Status and Ratings */}
            <div className="col-md-4">
              <label className="form-label">Status</label>
              <select name="status" className="form-select">
                <option value="Scheduled">Scheduled</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="col-md-4">
              <InputField
                label="Focus Rating"
                name="focusRating"
                type="text"
                placeholder="Enter focus rating"
              />
            </div>
            <div className="col-md-4">
              <InputField
                label="Comprehension Rating"
                name="comprehensionRating"
                type="text"
                placeholder="Enter comprehension rating"
              />
            </div>
            <div className="col-md-12">
              <Button
                type="submit"
                label={isSubmitting ? "Adding..." : "Add Session"}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SessionForm;
