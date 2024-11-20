import React, { useState, useEffect } from 'react';

function News() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Function to fetch news articles
    const fetchNews = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY; // Get the API key from .env
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
        );
        const data = await response.json();
        setArticles(data.articles);
        console.log('Fetched news articles:', data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h2>Latest News</h2>
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <div key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h4>{article.title}</h4>
            </a>
            <p>{article.description}</p>
          </div>
        ))
      ) : (
        <p>Loading news...</p>
      )}
    </div>
  );
}

export default News;
