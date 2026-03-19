import { useEffect, useState } from "react";
import API from "./services/api";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import FilterBar from "./components/FilterBar";
import SearchBar from "./components/SearchBar";
import SortBar from "./components/SortBar";
import Toast from "./components/Toast";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [toast, setToast] = useState({ message: "", type: "success" });

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (!toast.message) return;

    const timer = setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  const fetchJobs = async () => {
    try {
      const response = await API.get("/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setToast({ message: "Failed to load jobs.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleAddJob = async (newJob) => {
    try {
      const response = await API.post("/jobs", newJob);
      setJobs((prevJobs) => [...prevJobs, response.data]);
      setToast({ message: "Job added successfully.", type: "success" });
      return true;
    } catch (error) {
      console.error("Error adding job:", error);
      setToast({ message: "Failed to add job.", type: "error" });
      return false;
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await API.delete(`/jobs/${jobId}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
      setToast({ message: "Job deleted successfully.", type: "success" });
    } catch (error) {
      console.error("Error deleting job:", error);
      setToast({ message: "Failed to delete job.", type: "error" });
    }
  };

  const handleUpdateJob = async (jobId, updatedJob) => {
    try {
      const response = await API.put(`/jobs/${jobId}`, updatedJob);
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job.id === jobId ? response.data : job))
      );
      setToast({ message: "Job updated successfully.", type: "success" });
    } catch (error) {
      console.error("Error updating job:", error);
      setToast({ message: "Failed to update job.", type: "error" });
    }
  };

  const totalJobs = jobs.length;
  const interviewCount = jobs.filter((job) => job.status === "Interview")
    .length;
  const rejectedCount = jobs.filter((job) => job.status === "Rejected").length;
  const offerCount = jobs.filter((job) => job.status === "Offer").length;

  const filteredJobs = jobs
    .filter((job) =>
      currentFilter === "All" ? true : job.status === currentFilter
    )
    .filter((job) => {
      const search = searchTerm.toLowerCase();
      return (
        job.company.toLowerCase().includes(search) ||
        job.position.toLowerCase().includes(search)
      );
    })
    .sort((a, b) => {
      if (sortOption === "newest") {
        return new Date(b.applied_date) - new Date(a.applied_date);
      }
      if (sortOption === "oldest") {
        return new Date(a.applied_date) - new Date(b.applied_date);
      }
      if (sortOption === "company-asc") {
        return a.company.localeCompare(b.company);
      }
      if (sortOption === "company-desc") {
        return b.company.localeCompare(a.company);
      }
      return 0;
    });

  return (
    <div className="app-page">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">Job Application Tracker</h1>
          <p className="app-subtitle">
            Track your applications, manage statuses, and stay organised.
          </p>
        </header>

        <section className="dashboard">
          <div className="stat-card">
            <h3>Total</h3>
            <p>{totalJobs}</p>
          </div>
          <div className="stat-card">
            <h3>Interviews</h3>
            <p>{interviewCount}</p>
          </div>
          <div className="stat-card">
            <h3>Rejected</h3>
            <p>{rejectedCount}</p>
          </div>
          <div className="stat-card">
            <h3>Offers</h3>
            <p>{offerCount}</p>
          </div>
        </section>

        <JobForm onAddJob={handleAddJob} />

        <div className="controls-top-row">
          <FilterBar
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
          />

          <SortBar sortOption={sortOption} onSortChange={setSortOption} />
        </div>

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {loading ? (
          <p className="loading-text">Loading jobs...</p>
        ) : (
          <JobList
            jobs={filteredJobs}
            onDeleteJob={handleDeleteJob}
            onUpdateJob={handleUpdateJob}
          />
        )}
      </div>
    </div>
  );
}

export default App;
