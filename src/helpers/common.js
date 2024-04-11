/* eslint-disable no-lonely-if */
/* eslint-disable import/prefer-default-export */
// import moment from 'moment';
import { logoutUser } from '../store/auth/login/action';

export const getToken = (dispatch) => {
  const accessToken = sessionStorage.getItem('token');
  const expiresIn = sessionStorage.getItem('expires_in');
  console.log("expiresIn:",expiresIn)
  return new Promise((resolve) => {
    // const diff = moment.unix(Number(expiresIn)).diff(moment(), 'minutes');
    const diff = expiresIn;
    console.log("diff:",diff)

    if (accessToken && diff > 5) {
      resolve(accessToken);
    } else {
      console.log('getToken ', diff);
      // eslint-disable-next-line no-unused-expressions
      dispatch && dispatch(logoutUser());
      resolve(accessToken);
    }
  });
};

export const getPager = (totalItems, currentPage, pagesize) => {
  // default to first page
  currentPage = currentPage || 1;

  // default page size is 10
  pagesize = pagesize || 10;

  // calculate total pages
  const totalPages = Math.ceil(totalItems / pagesize);

  let startPage;
  let endPage;
  if (totalPages <= 10) {
    // less than 10 total pages so show all
    startPage = 1;
    endPage = totalPages;
  } else {
    // more than 10 total pages so calculate start and end pages
    if (currentPage <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (currentPage + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }
  }

  // calculate start and end item indexes
  const startIndex = (currentPage - 1) * pagesize;
  const endIndex = Math.min(startIndex + pagesize - 1, totalItems - 1);

  // create an array of pages to ng-repeat in the pager control
  const pages = [...Array(endPage + 1 - startPage).keys()].map((i) => startPage + i);

  // return object with all pager properties required by the view

  return {
    totalItems,
    currentPage,
    pagesize,
    totalPages,
    startPage,
    endPage,
    startIndex,
    endIndex,
    pages,
  };
};


// export const modifyRolesList = (roles) => {
//   const roleItems = [];
//   roles.forEach((role) => {
//     const { roleName, roleId } = role;
//     roleItems.push({
//       label: roleName,
//       value: roleId,
//     });
//   });
//   return roleItems;
// };

export const modifyCustomersList = (roles) => {
  console.log(roles)
  const customerItems = [];
  roles.forEach((customer) => {
    const { customerName, id } = customer;
    customerItems.push({
      label: customerName,
      value: id,
    });
  });
  return customerItems;
};

export const modifyEmployeesList = (roles) => {
  const employeeItems = [];
  roles.forEach((employee) => {
    console.log("employee;", employee)
    const { empId, id } = employee;
    employeeItems.push({
      label: empId,
      value: id,
    });
  });
  return employeeItems;
};

export const modifyGarmentsList = (garment) => {
  console.log(garment);
  const garmentItems=[];
  const garmentList=[];
  garment.forEach((res)=>{
    if(garmentItems.indexOf(res.garment && res.garment.garmentTypeId)===-1){
      garmentItems.push(res)
      console.log("garmentItems:",garmentItems)
    }
  })
  console.log("garmentItems:",garmentItems)
  garmentItems.forEach((items)=>{
    garmentList.push({
      label: items.productCode,
      value: items.garmentTypeId,
    })
  })
  return garmentList;
  // const garmentsItems = [];
  // garment.forEach((garments) => {
  //   const { garmentTypeId, productCode } = garments;
  //   garmentsItems.push({
  //     label: productCode,
  //     value: garmentTypeId,
  //   });
  // });
  // return garmentsItems;
};
export const modifyGarmentsListProductcode = (ProductCode) => {
  const ProductCodeItems = [];
  ProductCode.forEach((Product) => {
    console.log("product", Product)
    const { garmentCode, id } = Product;
    ProductCodeItems.push({
      label: garmentCode,
      value: id,
    });
  });
  return ProductCodeItems;
};
export const modifyGarmentsListGarmentcode = (ProductCode) => {
  const ProductCodeItems = [];
  ProductCode.forEach((Product) => {
    console.log("product", Product)
    const { garmentCode, id } = Product;
    ProductCodeItems.push({
      label: garmentCode,
      value: id,
    });
  });
  return ProductCodeItems;
};


export const modifyDepartmentsList = (garment) => {

  const departmentsItems = [];
  garment.forEach((department) => {
    const { departmentNumber, id } = department;
    if(departmentNumber)
    departmentsItems.push({
      label: departmentNumber,
      value: id,
    });

  });

  return departmentsItems;
};

export const modifyDepartment = (garment) => {

  const departmentsItems = [];
  garment.forEach((department) => {
    const { departmentName, id } = department;
    departmentsItems.push({
      label: departmentName,
      value: id,
    });

  });

  return departmentsItems;
};

export const modifyProductCode = (deptProductcode) => {
  console.log("deptproductcode:", deptProductcode)
  
  const productCodeItems = [];
  deptProductcode.forEach((code) => {
    const { productCode, garmentTypeId } = code;
    if(productCode!==null){
    productCodeItems.push({
      label: productCode,
      value: garmentTypeId,
    })}
  })
  return productCodeItems;

}

export const modifyLockersList = (garment) => {
  const lockersItems = [];
  garment.forEach((locker) => {
    const { lockerName, id } = locker;
    lockersItems.push({
      label: lockerName,
      value: id,
    });
  });
  return lockersItems;
};

export const modifyGarmentsListCustomerName = (Customer) => {
  const CustomerNameItems = [];
  Customer.forEach((name) => {
    // console.log("name", name);
    const { customerName, id } = name;
    CustomerNameItems.push({
      label: customerName,
      value: id,
    });
  });
  return CustomerNameItems;
};

export const modifyReasonsList = (reasons) => {
  console.log(reasons)
  const ReasonItems = [];
  const ReasonList = [];
  console.log("ReasonList:",ReasonList)
  reasons.forEach(res => {
    if (ReasonItems.indexOf(res.reason) === -1) {
      ReasonItems.push(res.reason)
    }
    // return ReasonItems;
  });

  ReasonItems.forEach((item) => {
    ReasonList.push({
      label: item,
      value: item,
    });

  });
  return ReasonList;
  
};

export const modifyReasonsRemarkList = (remarks) => {
  const CustomerNameItems = [];
  remarks.forEach((name) => {
    console.log("remarks", remarks);
    const { description, id } = name;
    CustomerNameItems.push({
      label: description,
      value: id,
    });
  });
  return CustomerNameItems;
};

export const modifyProjectList=(Project)=>{
  const ProjectListItems =[];
  Project.forEach((item)=>{
    console.log("item:",item)
    const{Id,ProjectName}=item;
    ProjectListItems.push({
      label:ProjectName,
      value:Id
    })
  })
  return ProjectListItems;
}
export const modifyTaskList=(Task)=>{
  const TaskListItems =[];
  Task.forEach((item)=>{
    console.log("item:",item)
    const{Id,TaskHeading}=item;
    TaskListItems.push({
      label:TaskHeading,
      value:Id
    })
  })
  return TaskListItems;
}
export const modifyReviewerList=(Task)=>{
  const modifyReviewerItems =[];
  Task.forEach((item)=>{
    console.log("item:",item)
    const{Id,DisplayName}=item;
    modifyReviewerItems.push({
      label:DisplayName,
      value:Id
    })
  })
  return modifyReviewerItems;
}
export const modifyRolesList=(Task)=>{
  const modifyReviewerItems =[];
  Task.forEach((item)=>{
    console.log("item:",item)
    const{Id,RoleName}=item;
    modifyReviewerItems.push({
      label:RoleName,
      value:Id
    })
  })
  return modifyReviewerItems;
}