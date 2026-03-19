import { useState } from "react";
import "./JobForm.css";

function JobForm({ onAddJob }) {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "Applied",
    applied_date: "",
    job_link: "",
    notes: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const isValidUrl = (value) => {
    if (!value.trim()) return true;

    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.company.trim()) {
      setErrorMessage("Company is required.");
      return;
    }

    if (!formData.position.trim()) {
      setErrorMessage("Position is required.");
      return;
    }

    if (!formData.applied_date) {
      setErrorMessage("Applied date is required.");
      return;
    }

    if (!isValidUrl(formData.job_link)) {
      setErrorMessage("Please enter a valid job link.");
      return;
    }

    const newJob = {
      ...formData,
    };

    const success = await onAddJob(newJob);

    if (success) {
      setFormData({
        company: "",
        position: "",
        status: "Applied",
        applied_date: "",
        job_link: "",
        notes: "",
      });
      setErrorMessage("");
    }
  };

  return (
    <div className="job-form-card">
      <h2 className="job-form-title">Add New Application</h2>

      <form onSubmit={handleSubmit} className="job-form">
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="job-input"
        />

        <input
          type="text"
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={handleChange}
          className="job-input"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="job-input"
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>

        <input
          type="date"
          name="applied_date"
          value={formData.applied_date}
          onChange={handleChange}
          className="job-input"
        />

        <input
          type="text"
          name="job_link"
          placeholder="https://example.com/job-posting"
          value={formData.job_link}
          onChange={handleChange}
          className="job-input"
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          className="job-textarea"
        />

        {errorMessage && <p className="form-error-message">{errorMessage}</p>}

        <button type="submit" className="job-submit-button">
          Add Job
        </button>
      </form>
    </div>
  );
}

export default JobForm;
