import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FeedPage = () => {
  const [report, setReport] = useState(null);
  const [likes, setLikes] = useState(false);
  const [dislikes, setDislikes] = useState(false);
  const [updatedReport, setUpdatedReport] = useState({
    reportTitle: '',
    reportPic: '',
    reportVideo: '',
    reportDescription: '',
    reportDivision: '',
    reportDistrict: '',
    crimeTime: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');
  const reportId = useParams('id');

  useEffect(() => {
    // Fetch the report
    const fetchReport = async () => {
      try {
        console.log(reportId)
        const response = await axios.get(`http://localhost:8000/api/reports/67ac2d3648c7754876fde57d`, {
        });
        setReport(response.data.report);
        setLikes(response.data.isLiked);
        setDislikes(response.data.isDisliked);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchReport();
  }, [reportId, userId]);

  const handleLikeDislike = async (action) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/reports/impression/${action}`, {
        reportId,
        userId,
      });
      setLikes(action === 'like' ? true : false);
      setDislikes(action === 'dislike' ? true : false);
      setReport(response.data.report);
    } catch (err) {
      console.log('Error during like/dislike:', err);
    }
  };

  const handleUpdateReport = async () => {
    try {
      const response = await axios.put('/api/reports/update', {
        reportId,
        ...updatedReport,
      });
      setReport(response.data.report);
      alert('Report updated successfully');
    } catch (err) {
      console.error('Error updating report:', err);
    }
  };

  const handleDeleteReport = async () => {
    try {
      await axios.delete('/api/reports/delete', {
        data: { reportId },
      });
      alert('Report deleted successfully');
      // Optionally redirect to another page
    } catch (err) {
      console.error('Error deleting report:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="feed-page">
      <h1>{report.reportTitle}</h1>
      {report.reportPic && <img src={report.reportPic} alt="Report" />}
      {report.reportVideo && <video src={report.reportVideo} controls />}
      <p>{report.reportDescription}</p>
      <p>{report.reportDivision}, {report.reportDistrict}</p>
      <p>Crime Time: {new Date(report.crimeTime).toLocaleString()}</p>
      <div>
        <button onClick={() => handleLikeDislike('like')} disabled={likes}>
          {likes ? 'Liked' : 'Like'} ({report.likeCount})
        </button>
        <button onClick={() => handleLikeDislike('dislike')} disabled={dislikes}>
          {dislikes ? 'Disliked' : 'Dislike'} ({report.dislikeCount})
        </button>
      </div>

      {userId === report.authorId && (
        <div>
          <h3>Update Report</h3>
          <input
            type="text"
            placeholder="Title"
            value={updatedReport.reportTitle}
            onChange={(e) => setUpdatedReport({ ...updatedReport, reportTitle: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={updatedReport.reportDescription}
            onChange={(e) => setUpdatedReport({ ...updatedReport, reportDescription: e.target.value })}
          />
          <button onClick={handleUpdateReport}>Update Report</button>
          <button onClick={handleDeleteReport}>Delete Report</button>
        </div>
      )}
    </div>
  );
};

export default FeedPage;
