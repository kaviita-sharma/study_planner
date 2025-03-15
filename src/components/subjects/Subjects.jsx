import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubjects,
  addSubject,
  updateSubject,
  deleteSubject,
} from "../../slices/subjectSlice";
import SubjectCard from "./SubjectCard";
import CircleLoader from "../common/Loader";
import SubjectModal from "./SubjectModal";
import Button from "../common/Button";

const Subjects = () => {
  const dispatch = useDispatch();
  const { subjects, loading, error } = useSelector((state) => state.subjects);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [selectedSubject, setSelectedSubject] = useState(false);

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  // Open Add Subject Modal
  const handleAddSubjectClick = () => {
    setSelectedSubject(null); // Reset any previous subject
    setModalMode("add");
    setShowModal(true);
  };

  // Open Edit Subject Modal
  const handleEditSubject = (subject) => {
    setSelectedSubject(subject); // Set subject for editing
    setModalMode("edit");
    setShowModal(true);
  };

  // Handle Add/Edit Form Submission
  const handleSaveSubject = (subjectData) => {
    if (modalMode === "add") {
      dispatch(addSubject(subjectData)).then(() => dispatch(fetchSubjects())); // Refresh after adding
    } else {
      dispatch(updateSubject({ id: selectedSubject.id, ...subjectData }))
        .then(() => dispatch(fetchSubjects())); // Refresh after updating
    }
    setShowModal(false); // Close modal after action
  };

  const handleDeleteSubject = (id) => {
    dispatch(deleteSubject(id));
  };
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Subjects</h2>
        <Button
          label="Add Subject"
          onClick={handleAddSubjectClick}
          className="btn btn-success"
        />
      </div>

      <SubjectModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveSubject}
        mode={modalMode}
        subject={selectedSubject}
      />

      {loading ? (
        <CircleLoader />
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : subjects.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
          <p className="text-muted">No subjects found. Please add a subject to get started.</p>
        </div>
      ) : (
        <div className="row">
          {subjects.map((subject) => (
            <div className="col-md-4" key={subject.id}>
              <SubjectCard
                subject={subject}
                onEdit={handleEditSubject}
                onDelete={handleDeleteSubject}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subjects;
