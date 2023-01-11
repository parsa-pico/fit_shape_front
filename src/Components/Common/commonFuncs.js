import { clearToken } from "../../Services.js/authService";

export function getPaymentStatus(id) {
  switch (id) {
    case 1:
      return "failed";
    case 2:
      return "pending";
    case 3:
      return "successful";
  }
}
export function getPaymentStatusClass(id) {
  switch (id) {
    case 1:
      return "table-danger";
    case 2:
      return "table-warning";
    case 3:
      return "table-success";
  }
}

export function getBloodType(id) {
  switch (id) {
    case 1:
      return "O+";
    case 2:
      return "O-";
    case 3:
      return "B+";
    case 4:
      return "B-";
    case 5:
      return "A+";
    case 6:
      return "A-";
    case 7:
      return "AB+";
    case 8:
      return "AB-";
  }
}

export function handleLogout(isStaff = false) {
  const login = isStaff ? "staff" : "athlete";
  clearToken();
  window.location = `/login/${login}`;
}
