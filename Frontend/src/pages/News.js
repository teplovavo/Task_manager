

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

function News() {
  // State hook for articles
  const [articles, setArticles] = useState([]);

  // Fetch news articles from the external API
  useEffect(() => {
    // Define the fetchNews function inside useEffect
    const fetchNews = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
        );
        console.log('News API Response:', response); // Log the full response
        if (response.status === 200) {
          setArticles(response.data.articles);
        } else {
          console.error(`Error: Received status code ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews(); // Call the fetchNews function
  }, []); // Empty dependency array means this runs once on mount

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
