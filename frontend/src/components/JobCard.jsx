import { useEffect, useState } from "react";
import "./JobCard.css";

function JobCard({ job, onDeleteJob, onUpdateJob }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedJob, setEditedJob] = useState({ ...job });

  useEffect(() => {
    setEditedJob({ ...job });
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedJob((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (
      !editedJob.company.trim() ||
      !editedJob.position.trim() ||
      !editedJob.applied_date
    ) {
      alert("Company, position, and applied date are required.");
      return;
    }

    onUpdateJob(editedJob.id, editedJob);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedJob({ ...job });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="job-card">
        <h3 className="job-edit-title">Edit Application</h3>

        <div className="job-edit-form">
          <input
            type="text"
            name="company"
            value={editedJob.company}
            onChange={handleChange}
            placeholder="Company"
            className="job-card-input"
          />

          <input
            type="text"
            name="position"
            value={editedJob.position}
            onChange={handleChange}
            placeholder="Position"
            className="job-card-input"
          />

          <select
            name="status"
            value={editedJob.status}
            onChange={handleChange}
            className="job-card-input"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Offer</option>
          </select>

          <input
            type="date"
            name="applied_date"
            value={editedJob.applied_date}
            onChange={handleChange}
            className="job-card-input"
          />

          <input
            type="text"
            name="job_link"
            value={editedJob.job_link}
            onChange={handleChange}
            placeholder="Job link"
            className="job-card-input"
          />

          <textarea
            name="notes"
            value={editedJob.notes}
            onChange={handleChange}
            placeholder="Notes"
            className="job-card-textarea"
          />

          <div className="job-card-actions">
            <button onClick={handleSave} className="job-save-button">
              Save
            </button>
            <button onClick={handleCancel} className="job-cancel-button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="job-card">
      <div className="job-card-top">
        <div>
          <h3 className="job-company">{job.company}</h3>
          <p className="job-position">{job.position}</p>
        </div>

        <span className={`job-badge status-${job.status.toLowerCase()}`}>
          {job.status}
        </span>
      </div>

      <p className="job-text">
        <strong>Applied Date:</strong> {job.applied_date}
      </p>

      {job.job_link && (
        <p className="job-text">
          <strong>Job Link:</strong>{" "}
          <a href={job.job_link} target="_blank" rel="noreferrer">
            View Posting
          </a>
        </p>
      )}

      {job.notes && (
        <p className="job-text">
          <strong>Notes:</strong> {job.notes}
        </p>
      )}

      <div className="job-card-actions">
        <button onClick={() => setIsEditing(true)} className="job-edit-button">
          Edit
        </button>
        <button
          onClick={() => onDeleteJob(job.id)}
          className="job-delete-button"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default JobCard;
