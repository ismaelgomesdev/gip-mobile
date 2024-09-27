import React, { useState, useEffect, useContext } from 'react';
import RequestList from '../components/Request/RequestList';
import { RequestContext } from '../src/contexts/RequestContext';
import './request-management.scss';

const RequestManagement = () => {
  const [editingRequest, setEditingRequest] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const { requests, updateRequest, addRequest, deleteRequest } = useContext(RequestContext);

  const handleSave = (request) => {
    if (request.id) {
      updateRequest(request);
    } else {
      addRequest(request);
    }
    setEditingRequest(null);
  };

  const handleEdit = (request) => {
    setEditingRequest(request);
  };

  const handleDelete = (id) => {
    deleteRequest(id);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const paginatedRequests = requests.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const pageCount = Math.ceil(requests.length / itemsPerPage);

  return (
    <div className="request-management">
      <h1>Solicitações dos Cidadãos</h1>
      <div className="request-management__content">
        <RequestList 
          requests={paginatedRequests} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
          pageCount={pageCount}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default RequestManagement;
