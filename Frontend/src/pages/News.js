

import React, { useState, useEffect } from 'react';

function News() {
  const [articles, setArticles] = useState([]);

  

  // Fetch news on component mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY; 
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
        );
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-page">
      <h2>Latest News</h2>
      <div className="news-container">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className="news-item">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <h4 className="news-title">{article.title}</h4>
              </a>
              <p>{article.description}</p>
            </div>
          ))
        ) : (
          <p>Loading news...</p>
        )}
      </div>
    </div>
  );
}

export default News;
