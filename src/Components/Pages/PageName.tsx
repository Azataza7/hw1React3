import React from 'react';
import { pageName } from '../../types';

interface PageNameProps {
  page?: pageName;
}

const PageName: React.FC<PageNameProps> = ({ page }) => {
  if (!page) {
    return null;
  }

  const { title, content } = page;

  return (
    <div className={"page " + title}>
      <h1 className="title">{title}</h1>
      <p className="page-text">{content}</p>
    </div>
  );
};

export default PageName;
