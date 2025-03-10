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
import { Link } from "react-router-dom";

const Subjects = () => {
  const dispatch = useDispatch();
  const { subjects, loading, error } = useSelector((state) => state.subjects);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  const handleAddSubject = (subjectData) => {
    dispatch(addSubject(subjectData));
  };

  const handleEditSubject = (subject) => {
    const updatedName = prompt("Update subject name:", subject.subjectName);
    if (updatedName && updatedName.trim() !== "") {
      dispatch(updateSubject({ id: subject.id, subjectName: updatedName }));
    }
  };

  const handleDeleteSubject = (id) => {
    dispatch(deleteSubject(id));
  };

  // Ensure subjects is an array
  const subjectList = Array.isArray(subjects) ? subjects : [];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Subjects</h2>
        <Button
          label="Add Subject"
          onClick={() => setShowModal(true)}
          className="btn btn-success"
        />
      </div>

      <SubjectModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAddSubject}
      />

      {loading ? (
        <CircleLoader />
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : subjectList.length === 0 ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "60vh" }}
        >
          <p className="text-muted">
            No subjects found. Please add a subject to get started.
          </p>
        </div>
      ) : (
        <div className="row">
          {subjectList.map((subject) => (
            <div className="col-md-4" key={subject.id}>
              <SubjectCard
                subject={subject}
                onEdit={handleEditSubject}
                onDelete={handleDeleteSubject}
              />
              <div className="mt-2 text-center">
                <Link
                  to={`/subject/${subject.id}`}
                  className="btn btn-info btn-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subjects;
