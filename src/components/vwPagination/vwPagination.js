/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const VWPagination = ({ pager, setPage }) => {

  return (
    <div className="d-flex flex-row-reverse">
      <Pagination className="pagination-sm">
        <PaginationItem disabled={pager.currentPage === 1}>
          <PaginationLink onClick={() => setPage(1)} previous />
        </PaginationItem>
        <PaginationItem disabled={pager.currentPage === 1}>
          <PaginationLink onClick={() => setPage(pager.currentPage - 1)}>‹</PaginationLink>
        </PaginationItem>
        {pager.pages &&
          pager.pages.map((page, i) => (
            <PaginationItem active={pager.currentPage === page} key={i}>
              <PaginationLink onClick={() => setPage(page)}>{page}</PaginationLink>
            </PaginationItem>
          ))}
        <PaginationItem disabled={pager.currentPage === pager.totalPages}>
          <PaginationLink onClick={() => setPage(pager.currentPage + 1)}>›</PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={pager.currentPage === pager.totalPages}>
          <PaginationLink onClick={() => setPage(pager.totalPages)} next />
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default VWPagination;
