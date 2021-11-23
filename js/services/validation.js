export default class Validation {
  isEmpty(value) {
    if (value.trim() != "") {
      return true;
    }
    alert("Dữ liệu bị trống");
    return false;
  }
}
