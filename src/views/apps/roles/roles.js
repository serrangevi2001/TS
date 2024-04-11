// /* eslint-disable react/prop-types */
// import moment from 'moment';
// import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';
// import 'react-table-v6/react-table.css';
// import { Card, CardBody, CardTitle, Badge, CardFooter } from 'reactstrap';
// import Datatable from '../../../components/tables/datatable';
// import NoRecord from '../../../components/norecord/norecord';
// import VWSkeleton from '../../../components/vwSkeleton/vwSkeleton';
// import { getRolesList } from '../../../store/apps/roles/actions';
// import { getPager } from '../../../helpers/common';
// import VWPagination from '../../../components/vwPagination/vwPagination';

// const Roles = ({ getRolesAction, roleList, isGetRolePending, totalRecordsCount }) => {
//   const [pageSize] = useState(30);
//   const [pager, setPager] = useState({
//     currentPage: 1,
//   });

//   const setPage = (page = 1) => {
//     getRolesAction(page, pageSize);
//     setPager(prevPager => {
//       const totalPages = Math.ceil(totalRecordsCount / pageSize);
//       const visiblePages = 10;
//       const pageOffset = Math.max(0, Math.floor((page - 1) / visiblePages) * visiblePages);
//       const newPages = [];
//       for (let i = pageOffset + 1; i <= Math.min(totalPages, pageOffset + visiblePages); i++) {
//         newPages.push(i);
//       }
//       return {
//         ...prevPager,
//         currentPage: page,
//         totalPages,
//         pages: newPages,
//       };
//     });
//   };

//   useEffect(() => {
//     const currentUpdatePager = getPager(totalRecordsCount, 1, pageSize);
//     setPager(currentUpdatePager);
//   }, [totalRecordsCount]);

//   useEffect(() => {
//     const currentPageNo = pager && pager.currentPage;
//     setPage(currentPageNo);
//   }, []);

//   // eslint-disable-next-line no-unused-vars
//   const [dtOptions, _setDtOptions] = useState({
//     searching: false,
//     paging: false,
//     ordering: true,
//     info: false,
//     responsive: true,
//     scrollY: '650px',
//   });

//   return (
//     <>
//       <Card>
//         <CardTitle
//           tag="h4"
//           className="border-bottom px-4 py-3 mb-0 d-flex justify-content-between align-items-center"
//         >
//           Roles
//         </CardTitle>
//         <CardBody className="p-4">
//           {roleList && roleList.length > 0 ? (
//             <div>
//               <Datatable options={dtOptions}>
//                 <table className="table table-striped table-hover w-100">
//                   <thead>
//                     <tr>
//                       <th>
//                         <strong>Display Name</strong>
//                       </th>
//                       <th className="text-center">
//                         <strong>Status</strong>
//                       </th>
//                       <th className="text-center">
//                         <strong>Created By</strong>
//                       </th>
//                       <th className="text-center">
//                         <strong>Created Date</strong>
//                       </th>
//                     </tr>
//                   </thead>
//                   {/* <tbody>
//                     {roleList.map((data) => (
//                       <tr key={data.id}>
//                         <td>{data.roleDisplayName || "NA"}</td>
//                         <td className="text-center">
//                           {data.isActive ? (
//                             <Badge color="success" className="text-dark-white">
//                               Active
//                             </Badge>
//                           ) : (
//                             <Badge color="danger" className="text-dark-white">
//                               Inactive
//                             </Badge>
//                           )}
//                         </td>
//                         <td className="text-center">{data.createdBy || 'NA'}</td>
//                         <td className="text-center">
//                           {data.createdTimeStamp
//                             ? moment(data.createdTimeStamp).format('DD MMM YYYY')
//                             : 'NA'}
//                         </td>
//                         {/* <td className="text-center">
//                         <Link
//                           type="button"
//                           className="btn btn-sm btn-outline-dark-success"
//                           to={`details/${data.id}`}
//                         >
//                           <i className="bi bi-search"></i>
//                         </Link>
//                       </td> */}
//                       </tr>
//                     ))}
//                   </tbody> */}
//                 </table>
//               </Datatable>
//             </div>
//           ) : isGetRolePending ? (
//             <>
//               <VWSkeleton type="body" />
//             </>
//           ) : (
//             <>
//               <NoRecord />
//             </>
//           )}
//         </CardBody>
//         {roleList.length > 0 && (
//           <CardFooter>
//             <VWPagination pager={pager} setPage={setPage} />
//           </CardFooter>
//         )}
//       </Card>
//     </>
//   );
// };

// const mapStateToProps = (state) => ({
//   roleList: state.role.roles,
//   isCreateRoleModalOpen: state.role.isCreateRoleModalOpen,
//   isGetRolePending: state.role.isGetRolePending,
//   totalRecordsCount: state.role.totalRecords,
// });

// const mapDispatchToProps = (dispatch) => ({
//   getRolesAction: (page, pageSize) => dispatch(getRolesList(page, pageSize)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Roles);


import React from 'react'

const roles = () => {
  return (
    <div>roles</div>
  )
}

export default roles