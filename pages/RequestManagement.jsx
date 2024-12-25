import React, { useContext, useState } from 'react';
import { RequestContext } from '../src/contexts/RequestContext';
import RequestList from '../components/Request/RequestList';
import styles from './request-management.module.scss';

const RequestManagement = () => {
  const { requests, updateRequest, deleteRequest } = useContext(RequestContext);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  if (!requests || !Array.isArray(requests)) {
    return <div>Carregando...</div>;  // Exibe algo enquanto requests não é carregado
  }

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const paginatedRequests = requests.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const pageCount = Math.ceil(requests.length / itemsPerPage);

  return (
    <div className="p-5 flex flex-col items-center w-full min-w-[73.5vw]">
      <h1 className="text-2xl font-bold mb-6">Gestão de Solicitações</h1>
      <RequestList
        requests={paginatedRequests}
        onEdit={updateRequest}
        onDelete={deleteRequest}
        pageCount={pageCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default RequestManagement;