import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import "../static/Dashboard.css";

const Dashboard = () => {
  const [totalArticles, setTotalArticles] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchCategorySummary = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/news/categories/sum");
        const data = await response.json();

        if (response.ok) {
          const totalArticlesCount = data.reduce((sum, category) => sum + category.article_count, 0);
          setTotalArticles(totalArticlesCount);
          setTotalCategories(data.length);
        } else {
          console.error("Error fetching category summary:", data.error);
        }
      } catch (error) {
        console.error("Error fetching category summary:", error);
      }
    };

    fetchCategorySummary();
  }, []);

  return (
    <div className="dashboard">
      {/* Key Metrics Section */}
      <div className="metrics">
        <div className="metric-card">
          <Link to="/all-articles">
            <h3>Total Articles</h3>
            <p>{totalArticles}</p>
          </Link>
        </div>
        <div className="metric-card">
          <h3>Total Categories</h3>
          <p>{totalCategories}</p>
        </div>
        <div className="metric-card">
          <h3>Total Users</h3>
          <p>45</p>
        </div>
        <div className="metric-card">
          <h3>Pending Approvals</h3>
          <p>3</p>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="analytics">
        <h2>Analytics</h2>
        <div className="chart">
          {/* Replace with a chart library like Chart.js or Recharts */}
          <p>[Chart Placeholder]</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <ul>
          <li>Added new article: "Breaking News Today"</li>
          <li>Updated category: "Technology"</li>
          <li>Deleted user: "Joel"</li>
          <li>Published article: "Sports Update"</li>
        </ul>
      </div>

      {/* Quick Actions Section */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions">
          <button onClick={() => navigate("/add-article")}>Add Article</button>
          <button onClick={() => navigate("/manage-categories")}>Manage Categories</button>
          <button onClick={() => navigate("/view-reports")}>View Reports</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
