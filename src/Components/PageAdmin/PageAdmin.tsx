import React, { useState, useEffect } from 'react';
import axiosApi from '../../axiosApi';
import {useNavigate} from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const PageAdmin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axiosApi.get('/pages.json');
        const data = response.data;
        setPages(Object.keys(data));
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    };

    void fetchPages();
  }, []);

  const handleSelectChange = async (event) => {
    const selected = event.target.value;

    try {
      const response = await axiosApi.get(`/pages/${selected}.json`);
      const { title, content } = response.data;
      setTitle(title);
      setContent(content);
      setSelectedPage(selected);
    } catch (error) {
      console.error('Error fetching page content:', error);
    }
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true)
      await axiosApi.put(`/pages/${selectedPage}.json`, { title, content });

      navigate('/pages/' + selectedPage)
    } catch (error) {
      console.error('Error updating page content:', error);
    } finally {
      setLoading(false)
    }
  };



  return (
    <>
      {loading ? <Spinner/> :
        <form className="form" onSubmit={onFormSubmit}>
        <div className="form-group">
          <label htmlFor="selectPage">Select page</label>
          <select
            id="selectPage"
            name="selectPage"
            className="text-bg-light w-50"
            value={selectedPage}
            onChange={handleSelectChange}
          >
            <option value="" disabled hidden>Choose page</option>
            {pages.map((page) => (
              <option key={page} value={page}>{page}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title" type="text" name="title" required
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content" name="content" required
            className="form-control text-area"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit">Save</button>
      </form>
      }
    </>
  );
};

export default PageAdmin;
