
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

function News() {
  // State hook for articles
  const [articles, setArticles] = useState([]);

  // Define backend URL
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

  // Fetch news articles from the backend API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/news`);
        console.log('News API Response:', response); // Log the full response
        if (response.status === 200) {
          setArticles(response.data.articles);
        } else {
          console.error(`Error: Received status code ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching news:', error.message);
      }
    };

    fetchNews(); // Call the fetchNews function
  }, [backendUrl]); // Include backendUrl as a dependency

  return (
    <div className="news-page">
      <h2>Latest News</h2>
      <div className="news-container">
        {articles && articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className="news-item">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <h4 className="news-title">{article.title}</h4>
              </a>
              <p>{article.description}</p>
            </div>
          ))
        ) : (
          <p>No news available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default News;
