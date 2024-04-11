import { combineReducers } from 'redux';
import NotesReducer from './apps/notes/NotesSlice';
import CustomizerReducer from './customizer/CustomizerSlice';
import ChatsReducer from './apps/chat/ChatSlice';
import ContactsReducer from './apps/contacts/ContactSlice';
import EmailReducer from './apps/email/EmailSlice';
import TicketReducer from './apps/ticket/TicketSlice';
import FormReducer from './core/form/reducer';
import LoginReducer from './auth/login/reducer';
import ForgotPasswordReducer from './auth/forgotpassword/reducer';
import ResetPasswordReducer from './auth/resetpassword/reducer';
import UserReducer from './apps/users/reducer';
import timeSheet from './apps/timeSheet/reducer';
import allTimeSheet from './apps/AllTimeSheet/reducer';
import myteamTimeSheet from './apps/MyTeamTimeSheet/reducer';
import UserDetailsReducer from './apps/userDetails/reducer';
import Dashboard from './apps/Dashboard/reducer'
import OrganisationReducer from './apps/organisations/reducer';
import RoleReducer from './apps/roles/reducer';
import SnackbarReducer from './core/snackbar/reducer';

const reducers = combineReducers({
  customizer: CustomizerReducer,
  notesReducer: NotesReducer,
  chatReducer: ChatsReducer,
  contactsReducer: ContactsReducer,
  emailReducer: EmailReducer,
  ticketReducer: TicketReducer,
  form: FormReducer,
  login: LoginReducer,
  forgotPassword: ForgotPasswordReducer,
  resetPassword: ResetPasswordReducer,
  user: UserReducer,
  TimeSheet:timeSheet,
  AllTimeSheet:allTimeSheet,
  MyteamTimeSheet:myteamTimeSheet,
  snackbar: SnackbarReducer,
  userDetails: UserDetailsReducer,
  organisation: OrganisationReducer,
  role: RoleReducer,
  dashboard:Dashboard
});

export default reducers;
