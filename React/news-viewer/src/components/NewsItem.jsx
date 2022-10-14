import React from 'react';
import styled from 'styled-components';

const NewsItemBlock = styled.div`
  display: flex;
  padding: 10px;

  .thumbnail {
    margin-right: 1rem;

    img {
      display: block;
      width: 160px;
      height: 150px;
      object-fit: cover;
    }
  }

  .content {
    width: 800px;
    position: relative;
    h2 {
      margin: 0;
    }

    p {
      margin: 0;
      line-height: 1.5;
      margin-top: 0.5rem;
      white-space: normal;
    }

    .sub {
      display: flex;
      position: absolute;
      right: 0;
      bottom: 0;
      font-size: 0.7rem;
      span {
        display: block;
        margin: 5px;
        &:last-child::before {
          content: '';
          width: 3px;
          height: 3px;
          background-color: #555;
          position: absolute;
          top: 0;
          bottom: 0;

          margin: auto -7px;
        }
      }
    }
  }

  & + & {
    margin-top: 3rem;
    border-top: 1px solid #ced4da;
  }
`;

const UrlA = styled.a.attrs((props) => ({
  target: '_blank',
  rel: 'noopener noreferrer',
}))`
  color: black;
`;

const NewsItem = ({ article }) => {
  const { title, description, url, urlToImage, author, publishedAt } = article;
  return (
    <NewsItemBlock>
      {
        <div className="thumbnail">
          <UrlA href={url}>
            <img
              src={urlToImage ? urlToImage : 'https://via.placeholder.com/160'}
              alt="img"
            />
          </UrlA>
        </div>
      }
      <div className="content">
        <UrlA href={url}>
          <h2>{title}</h2>
        </UrlA>
        <p>
          {description
            ? description.length > 150
              ? description.slice(0, 149) + '...'
              : description
            : '내용이 없습니다.'}
        </p>
        <div className="sub">
          <span>{author ? author : '익명'}</span>
          <span>{publishedAt}</span>
        </div>
      </div>
    </NewsItemBlock>
  );
};

export default NewsItem;
