import React, {useEffect, useState} from 'react';
import axiosApi from '../../axiosApi';
import {useParams} from 'react-router-dom';
import {pagesJson} from '../../types';
import PageName from './PageName';
import Spinner from '../Spinner/Spinner';

const Pages: React.FC = () => {
  const [pagesList, setPagesList] = useState<pagesJson>();
  const [loading, setLoading] = useState(false);
  const { pageName: selectedCategory } = useParams<{ pageName: string }>();

  const filterDataByCategory = (data, selectedCategory = 'homepage') => {
    if (data[selectedCategory]) {
      return {[selectedCategory]: data[selectedCategory]};
    }
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axiosApi.get<pagesJson>('/pages.json');
      const results = response.data;
      const filteredData = filterDataByCategory(results, selectedCategory) as pagesJson;

      setPagesList(filteredData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, [selectedCategory]);

  let pageItem = pagesList && Object.keys(pagesList).length > 0 && (
    <PageName page={pagesList[selectedCategory || 'homepage']} />
  )

  return (
    <>
      {loading ? <Spinner/> : pageItem}
    </>
  );
};

export default Pages;