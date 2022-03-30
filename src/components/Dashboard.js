import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Nav from '../components/Nav';

export default function Dashboard() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('/');

  async function handleLogout() {
    setError('');

    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  }
  return (
    <>
      <Header>
        <Nav setCurrentPage={setCurrentPage}></Nav>
      </Header>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong> {currentUser?.email}
          <Link
            to="/update-profile"
            className="btn btn-outline-danger w-100 mt-3"
          >
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button type="button" className="btn btn-danger" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
