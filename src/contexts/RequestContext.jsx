import React, { createContext, useState, useEffect } from 'react';

export const RequestContext = createContext();

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/requests')
      .then(response => response.json())
      .then(data => {
        setRequests(Array.isArray(data.requests) ? data.requests : []);
      })
      .catch(error => {
        console.error('Error loading requests:', error);
        setRequests([]);
      });
  }, []);

  const persistRequests = (updatedRequests) => {
    fetch('http://localhost:5000/api/requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests: updatedRequests }),
    }).catch(error => console.error('Error persisting requests:', error));
  };

  const updateRequest = (updatedRequest) => {
    const updatedRequests = requests.map(request =>
      request.id === updatedRequest.id ? updatedRequest : request
    );
    setRequests(updatedRequests);
    persistRequests(updatedRequests);
  };

  const addRequest = (newRequest) => {
    newRequest.id = Date.now().toString();
    const updatedRequests = [...requests, newRequest];
    setRequests(updatedRequests);
    persistRequests(updatedRequests);
  };

  const deleteRequest = (id) => {
    const updatedRequests = requests.filter(request => request.id !== id);
    setRequests(updatedRequests);
    persistRequests(updatedRequests);
  };

  return (
    <RequestContext.Provider value={{ requests, updateRequest, addRequest, deleteRequest }}>
      {children}
    </RequestContext.Provider>
  );
};
