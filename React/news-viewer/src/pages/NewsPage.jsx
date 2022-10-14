import React from 'react';
import Categories from '../components/Categories';
import Header from '../components/Header';
import NewsList from '../components/NewsList';

const NewsPage = ({ match }) => {
  const category = match.params.category || 'all';

  return (
    <>
      <Header>
        <Categories />
      </Header>
      <NewsList category={category} />
    </>
  );
};

export default NewsPage;
