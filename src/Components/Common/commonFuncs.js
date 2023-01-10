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
