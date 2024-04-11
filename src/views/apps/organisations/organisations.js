/* eslint-disable react/prop-types */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import 'react-table-v6/react-table.css';
import { Card, CardBody, CardTitle, Badge, CardFooter } from 'reactstrap';
import Datatable from '../../../components/tables/datatable';
import NoRecord from '../../../components/norecord/norecord';
import VWSkeleton from '../../../components/vwSkeleton/vwSkeleton';
import {
  closeCreateOrganisationModal,
  getOrganisationsList,
  openCreateOrganisationModal,
} from '../../../store/apps/organisations/actions';
import { getPager } from '../../../helpers/common';
import VWPagination from '../../../components/vwPagination/vwPagination';

const Organisations = ({ getOrganisationsAction, organisationList, isGetOrganisationPending, totalRecordsCount }) => {

  const [pageSize] = useState(30);
  const [pager, setPager] = useState({
    currentPage: 1,
  });

  // const setPage = (page = 1) => {
  //   getOrganisationsAction(page, pageSize);
  // };

  const setPage = (page = 1) => {
    setPager(prevPager => ({
      ...prevPager,
      currentPage: page
    }));
    getOrganisationsAction(page, pageSize);
  };

  useEffect(() => {
    const currentUpdatePager = getPager(totalRecordsCount, 1, pageSize);
    setPager(currentUpdatePager);
  }, [totalRecordsCount]);

  useEffect(() => {
    const currentPageNo = pager && pager.currentPage;
    setPage(currentPageNo);
  }, []);


  // eslint-disable-next-line no-unused-vars
  const [dtOptions, _setDtOptions] = useState({
    searching: false,
    paging: false,
    ordering: true,
    info: false,
    responsive: true,
    scrollY: '650px',
  });

  return (
    <>
      <Card>
        <CardTitle
          tag="h4"
          className="border-bottom px-4 py-3 mb-0 d-flex justify-content-between align-items-center"
        >
          Organisations
        </CardTitle>
        <CardBody className="p-4">
          {organisationList && organisationList.length > 0 ? (
            <div>
              <Datatable options={dtOptions}>
                <table className="table table-striped table-hover w-100">
                  <thead>
                    <tr>
                      <th>
                        <strong>Name</strong>
                      </th>
                      <th>
                        <strong>Email</strong>
                      </th>
                      <th className="text-center">
                        <strong>Status</strong>
                      </th>
                      <th>
                        <strong>Created By</strong>
                      </th>
                      <th>
                        <strong>Created Date</strong>
                      </th>
                      {/* <th className="text-center">
                      <strong>View</strong>
                    </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {organisationList.map((data) => (
                      <tr key={data.id}>
                        <td>{data.orgName ||"NA"}</td>
                        <td>{data.orgEmail || "NA"}</td>
                        <td className="text-center">
                          {data.isActive ? (
                            <Badge color="success" className="text-dark-white">
                              Active
                            </Badge>
                          ) : (
                            <Badge color="danger" className="text-dark-white">
                              Inactive
                            </Badge>
                          )}
                        </td>
                        <td>{data.createdBy || 'NA'}</td>
                        <td>
                          {data.createdTimeStamp
                            ? moment(data.createdTimeStamp).format('DD MMM YYYY')
                            : 'NA'}
                        </td>
                        {/* <td className="text-center">
                        <Link
                          type="button"
                          className="btn btn-sm btn-outline-dark-success"
                          to={`details/${data.id}`}
                        >
                          <i className="bi bi-search"></i>
                        </Link>
                      </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Datatable>
            </div>
          ) : isGetOrganisationPending ? (
            <>
              <VWSkeleton type="body" />
            </>
          ) : (
            <>
              <NoRecord />
            </>
          )}
        </CardBody>
        {organisationList.length > 0 && (
          <CardFooter>
            <VWPagination pager={pager} setPage={setPage} />
          </CardFooter>
        )}
      </Card>
    </>
  );
};

const mapStateToProps = (state) => ({
  organisationList: state.organisation.organisations,
  isCreateOrganisationModalOpen: state.organisation.isCreateOrganisationModalOpen,
  isGetOrganisationPending: state.organisation.isGetOrganisationPending,
  totalRecordsCount : state.organisation.totalRecords
});

const mapDispatchToProps = (dispatch) => ({
  getOrganisationsAction: (page, pageSize) => dispatch(getOrganisationsList(page, pageSize)),
  closeCreateOrganisationModalAction: () => dispatch(closeCreateOrganisationModal()),
  openCreateOrganisationModalAction: () => dispatch(openCreateOrganisationModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Organisations);
