import { useState } from "react";

function App() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [evidenceText, setEvidenceText] = useState("");
  const [message, setMessage] = useState("");

  const requirements = [
    { id: 1, title: "Faculty Details Submission", institution: "ABC Engineering College", deadline: "2026-11-15", status: "Pending", description: "Submit updated list of teaching faculty with qualifications and experience." },
    { id: 2, title: "Infrastructure Compliance Report", institution: "XYZ Institute of Technology", deadline: "2026-10-30", status: "Overdue", description: "Submit detailed report of classrooms, labs and other infrastructure." },
    { id: 3, title: "Library Documents Upload", institution: "PQR College of Engineering", deadline: "2026-11-20", status: "Compliant", description: "Upload library stock verification and digital resources report." },
    { id: 4, title: "Anti-Ragging Affidavit", institution: "LMN Technical Campus", deadline: "2026-11-05", status: "Pending", description: "Submit signed anti-ragging affidavits from students and parents." },
    { id: 5, title: "Fire Safety Certificate", institution: "ABC Engineering College", deadline: "2026-10-25", status: "Overdue", description: "Upload valid Fire Safety Certificate issued by competent authority." },
    { id: 6, title: "Laboratory Equipment List", institution: "XYZ Institute of Technology", deadline: "2026-11-25", status: "Compliant", description: "Submit updated list of laboratory equipment with purchase dates." }
  ];

  const totalCount = requirements.length;
  const pendingCount = requirements.filter(item => item.status === "Pending").length;
  const compliantCount = requirements.filter(item => item.status === "Compliant").length;
  const overdueCount = requirements.filter(item => item.status === "Overdue").length;

  const getStatusColor = (status) => {
    if (status === "Compliant") return "#27ae60";
    if (status === "Pending") return "#e67e22";
    if (status === "Overdue") return "#c0392b";
    return "#333";
  };

  const getDeadlineColor = (deadline) => {
    const today = new Date();
    const dueDate = new Date(deadline);
    const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return "#c0392b";
    if (diffDays <= 7) return "#e67e22";
    return "#333";
  };

  const filteredList = filter === "All" ? requirements : requirements.filter(item => item.status === filter);

  const handleSubmitEvidence = () => {
    if (evidenceText.trim() === "") {
      setMessage("Please enter some evidence details.");
      return;
    }
    setMessage("Evidence submitted successfully! (This is a demo)");
    setEvidenceText("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#f0f4f8", minHeight: "100vh", maxWidth: "1200px", margin: "0 auto" }}>
      
      <div style={{ marginBottom: "25px" }}>
        <h1 style={{ margin: "0 0 6px 0", fontSize: "26px", color: "#1a1a1a" }}>AICTE Compliance Monitoring</h1>
        <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Track institutional compliance requirements, deadlines and evidence submissions</p>
      </div>

      {/* Summary Cards - Labels Pure Black */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "15px", marginBottom: "25px" }}>
        <div style={{ background: "white", padding: "18px", borderRadius: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.08)", borderTop: "4px solid #3498db" }}>
          <h3 style={{ margin: "0 0 6px 0", fontSize: "14px", color: "#000000", fontWeight: "600" }}>Total</h3>
          <p style={{ fontSize: "26px", fontWeight: "bold", margin: 0, color: "#2c3e50" }}>{totalCount}</p>
        </div>
        <div style={{ background: "white", padding: "18px", borderRadius: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.08)", borderTop: "4px solid #e67e22" }}>
          <h3 style={{ margin: "0 0 6px 0", fontSize: "14px", color: "#000000", fontWeight: "600" }}>Pending</h3>
          <p style={{ fontSize: "26px", fontWeight: "bold", margin: 0, color: "#e67e22" }}>{pendingCount}</p>
        </div>
        <div style={{ background: "white", padding: "18px", borderRadius: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.08)", borderTop: "4px solid #27ae60" }}>
          <h3 style={{ margin: "0 0 6px 0", fontSize: "14px", color: "#000000", fontWeight: "600" }}>Compliant</h3>
          <p style={{ fontSize: "26px", fontWeight: "bold", margin: 0, color: "#27ae60" }}>{compliantCount}</p>
        </div>
        <div style={{ background: "white", padding: "18px", borderRadius: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.08)", borderTop: "4px solid #c0392b" }}>
          <h3 style={{ margin: "0 0 6px 0", fontSize: "14px", color: "#000000", fontWeight: "600" }}>Overdue</h3>
          <p style={{ fontSize: "26px", fontWeight: "bold", margin: 0, color: "#c0392b" }}>{overdueCount}</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {["All", "Pending", "Compliant", "Overdue"].map((btn) => (
          <button key={btn} onClick={() => setFilter(btn)}
            style={{
              padding: "7px 16px", borderRadius: "6px",
              border: filter === btn ? "2px solid #3498db" : "1px solid #ccc",
              background: filter === btn ? "#eaf4fc" : "white",
              cursor: "pointer", fontWeight: filter === btn ? "bold" : "normal", fontSize: "13px"
            }}>
            {btn}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "white", borderRadius: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.08)", overflowX: "auto", marginBottom: "25px" }}>
        {filteredList.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#777" }}>
            <p style={{ fontSize: "15px", margin: 0 }}>No requirements found for this filter.</p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "700px" }}>
            <thead>
              <tr style={{ backgroundColor: "#f1f5f9", textAlign: "left" }}>
                <th style={{ padding: "12px 14px", width: "50px" }}>#</th>
                <th style={{ padding: "12px 14px" }}>Requirement</th>
                <th style={{ padding: "12px 14px" }}>Institution</th>
                <th style={{ padding: "12px 14px" }}>Deadline</th>
                <th style={{ padding: "12px 14px" }}>Status</th>
                <th style={{ padding: "12px 14px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((item, index) => (
                <tr key={item.id} style={{ borderTop: "1px solid #eee" }}>
                  <td style={{ padding: "12px 14px", color: "#777" }}>{index + 1}</td>
                  <td style={{ padding: "12px 14px" }}>{item.title}</td>
                  <td style={{ padding: "12px 14px" }}>{item.institution}</td>
                  <td style={{ padding: "12px 14px", fontWeight: "bold", color: getDeadlineColor(item.deadline) }}>{item.deadline}</td>
                  <td style={{ padding: "12px 14px", fontWeight: "bold", color: getStatusColor(item.status) }}>{item.status}</td>
                  <td style={{ padding: "12px 14px" }}>
                    <button onClick={() => { setSelected(item); setMessage(""); setEvidenceText(""); }}
                      style={{ padding: "5px 12px", background: "#3498db", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "13px" }}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <div style={{ background: "white", padding: "22px", borderRadius: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }}>
          <h2 style={{ marginTop: 0, fontSize: "20px" }}>{selected.title}</h2>
          <p style={{ margin: "6px 0" }}><strong>Institution:</strong> {selected.institution}</p>
          <p style={{ margin: "6px 0" }}><strong>Deadline:</strong> <span style={{ fontWeight: "bold", color: getDeadlineColor(selected.deadline) }}>{selected.deadline}</span></p>
          <p style={{ margin: "6px 0" }}><strong>Status:</strong> <span style={{ color: getStatusColor(selected.status), fontWeight: "bold" }}>{selected.status}</span></p>
          <p style={{ margin: "6px 0" }}><strong>Description:</strong> {selected.description}</p>
          <hr style={{ margin: "18px 0", border: "none", borderTop: "1px solid #eee" }} />
          <h3 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>Submit Evidence</h3>
          <textarea value={evidenceText} onChange={(e) => setEvidenceText(e.target.value)}
            placeholder="Write evidence details or document reference here..." rows="3"
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontFamily: "Arial", fontSize: "14px", marginBottom: "12px", boxSizing: "border-box" }} />
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button onClick={handleSubmitEvidence} style={{ padding: "9px 18px", background: "#27ae60", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>Submit Evidence</button>
            <button onClick={() => setSelected(null)} style={{ padding: "9px 18px", background: "#7f8c8d", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Close</button>
          </div>
          {message && <p style={{ marginTop: "12px", color: message.includes("successfully") ? "#27ae60" : "#c0392b", fontWeight: "bold", fontSize: "14px" }}>{message}</p>}
        </div>
      )}
    </div>
  );
}

export default App;