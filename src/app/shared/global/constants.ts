export const USER_TYPES = {
  ADMIN: 'admin',
  MEMBER: 'member',
  CHECKER: 'checker'
};
export const PAYMENT_MODES = {
  CASH: 'Cash',
  CHEQUE: 'Cheque',
  ONLINE: 'Online'
};
export const PAYMENT_STATUSES = {
  PAID: 'Paid',
  PENDING: 'Pending',
  FAILED: 'Failed'
};

//payment statuses list with value and label and css class
export const PAYMENT_STATUSES_LIST = [
  { value: PAYMENT_STATUSES.PAID, label: 'Paid', class: 'badge bg-success' },
  { value: PAYMENT_STATUSES.PENDING, label: 'Pending', class: 'badge bg-warning' },
  { value: PAYMENT_STATUSES.FAILED, label: 'Failed', class: 'badge bg-danger' }
];

export const MONTHS_LIST = [
  { value: 'January', label: 'January' },
    { value: 'February', label: 'February' },
    { value: 'March', label: 'March' },
    { value: 'April', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'June', label: 'June' },
    { value: 'July', label: 'July' },
    { value: 'August', label: 'August' },
    { value: 'September', label: 'September' },
    { value: 'October', label: 'October' },
    { value: 'November', label: 'November' },
    { value: 'December', label: 'December' }
];

export const navigationLinks = [
  { label: 'Manage Members', path: 'members' },
  { label: 'Maintenance', path: 'maintenance' },
  { label: 'Payments', path: 'payments' },
  { label: 'Activities', path: 'activities' },
  { label: 'Reports', path: 'reports' },
  { label: 'Logout', path: '' }
];

export const MEMBER_DETAILS = [
  { label: 'Member ID', key: 'memberId' },
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Phone', key: 'phone' },
  { label: 'Address', key: 'address' }
];

//MEMBER_DETAILS_COLUMNS 
export const MEMBER_DETAILS_COLUMNS = [
  { label: '#', key: 'index' },
  { label: 'Name', key: 'name' },
  { label: 'Apartment Number', key: 'apartmentNumber' },
  { label: 'Email', key: 'email' },
  { label: 'Phone', key: 'phone' },
  { label: 'Actions', key: 'actions' }
];

export const PAYMENT_DETAILS_COLUMNS = [
  { label: 'Month', key: 'month' },
  { label: 'Amount', key: 'amount' },
  { label: 'Fine', key: 'fine' },
  { label: 'Date', key: 'date' },
  { label: 'Mode', key: 'mode' },
  { label: 'Status', key: 'status' }
];

export const config = {
    FirebaseConfig: {
        apiUrl: 'https://sgesociety-3f2c9-default-rtdb.firebaseio.com', // Backend URL
    },
    memberListCollectionName: 'societyMembers', // Collection name for members
    memberListCollectionNameWithJson: 'societyMembers.json', // Collection name with .json for Firebase
};