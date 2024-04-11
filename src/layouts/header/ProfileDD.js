/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DropdownItem } from 'reactstrap';
import { User } from 'react-feather';
// import user1 from '../../assets/images/users/user1.jpg';
import Avatar from 'react-avatar';

const ProfileDD = ({ currentProfile, email,userList }) => {

  console.log(userList);
  console.log("currentProfile",currentProfile);

  return (
    <div>
      <div className="d-flex gap-3 p-3 border-bottom pt-2 align-items-center">
        {/* <img src={user1} alt="user" className="rounded-circle" width="60" /> */}
        <Avatar name={currentProfile.displayName} round size={30} />
        <span>
          <h5 className="mb-0">{currentProfile.displayName}</h5>
          <small>{currentProfile.currentUserRoles}</small>
          <small>{email}</small>
        </span>
      </div>
      <DropdownItem className="px-4 py-3">
        <User size={20} />
        &nbsp;
        <Link
          style={{ paddingLeft: 13, textDecoration: 'none', color: 'black' }}
          to={`/app/users/details/${currentProfile.UserId}`}
        >
          My Profile
        </Link>
      </DropdownItem>
      <DropdownItem divider />
    </div>
  );
};

const mapStateToProps = (state) => ({
  userList: state.user.users,
  currentProfile: state.login.profile,
  currentRole: state.login.profile.currentUserRoles,
  form: state.form,
});

export default connect(mapStateToProps)(ProfileDD);
