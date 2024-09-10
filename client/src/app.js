import React, { createContext, useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/style.css';

import Sign from './pages/sign';
import Home from './pages/home';
import Log from './pages/log';
import AddUser from './components/userForm/userForm';
import AddShip from './components/shipForm/shipForm';
import AddFile from './components/pdfForm/pdfForm';
import EditUser from './components/editUser/editUser';
import ChangeUser from './pages/changeUser';
import EditShip from './components/editShip/editShip';
import ChangeShip from './pages/changeShip';
import EditPdf from './components/editPdf/pdf';
import SearchUser from './components/userSearch/userSearch';
import Search from './components/search/search';
import SearchPdf from './components/searchPdf/searchPdf';
import Profile from './pages/profile';
import RenderPdf from './components/renderPdf/renderPdf';
import ShipSearch from './components/shipSearch/shipSearch';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<Sign />} />
            <Route path="/signup" element={<Sign />} />
            <Route path="/login" element={<Log />} />
            <Route path="/home" element={<Home />} />
            <Route path="/addUser" element={<AddUser />} />
            <Route path="/addShip" element={<AddShip />} />
            <Route path="/addFile" element={<AddFile />} />
            <Route path="/editUser" element={<EditUser />} />
            <Route path="/user/:userId" element={<ChangeUser />} />
            <Route path="/editShip" element={<EditShip />} />
            <Route path="/ship/:shipId" element={<ChangeShip />} />
            <Route path="/editPdf" element={<EditPdf />} />
            <Route path="/searchUser" element={<SearchUser />} />
            <Route path="/search" element={<Search />} />
            <Route path="/searchPdf" element={<SearchPdf />} />
            <Route path="/shipSearch" element={<ShipSearch />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/renderPdf" element={<RenderPdf />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </UserContext.Provider>
  );
}

export default App;
