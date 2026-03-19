import JobCard from "./JobCard";
import "./JobList.css";

function JobList({ jobs, onDeleteJob, onUpdateJob }) {
  if (jobs.length === 0) {
    return (
      <div className="job-list-empty">
        <h3>No job applications found</h3>
        <p>Add a new application or change the filter.</p>
      </div>
    );
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onDeleteJob={onDeleteJob}
          onUpdateJob={onUpdateJob}
        />
      ))}
    </div>
  );
}

export default JobList;
