import Navigation from '../Components/Navigation/Navigation';
import {Routes, Route} from 'react-router-dom';
import Pages from '../Components/Pages/Pages';
import PageAdmin from '../Components/PageAdmin/PageAdmin';
import './App.css';

const App = () => {

  return (
    <>
      <main className="main d-flex">
        <aside>
          <Navigation/>
        </aside>
        <div className="content">
          <Routes>
            <Route path="admin" element={(<PageAdmin/>)}/>
            <Route path="/" element={(<Pages/>)}/>
            <Route path="/pages/:pageName" element={(<Pages/>)}/>
            <Route path="/pages/:pageName/edit" element={(<PageAdmin/>)}/>
            <Route path="*" element={(
              <div className="no-result-container">
                <h3>No results</h3>
              </div>
            )}/>
          </Routes>
        </div>
      </main>
    </>
  );
};

export default App;
