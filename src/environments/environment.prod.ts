export const environment = {
  production: true,
  title: "InternationalEcademy",
  apiPath: "http://localhost:7099",

  // Mail settings
  toEmail: "eroboticsservices@gmail.com", //"info@erp.com", 
  ccEmail: null,
  bccEmail: null,
  // End of mail settings

  // Date settings
  todayDate: new Date(),
  date: new Date().getDate(),
  month: new Date().getMonth().toString(),
  year: new Date().getFullYear(),
  // End of date settings

  // Data table settings
  lengthMenu: [1, 2, 5, 10, 25, 50, 75, 100], // to select no of rows
  processing: true,
  pagingType: "full_numbers", // simple, simple_numbers, full, full_numbers, numbers, first_last_numbers
  language: {
    lengthMenu: '<small class="text-danger">Show _MENU_ Row(s)</small>',
    search: '<i class="fa fa-search text-info"></i> <small class="text-primary">Search</small>&nbsp;',
    info: '<small class="text-danger">_START_ - _END_ / _TOTAL_ Row(s)</small>',
    paginate: { first: '<i class="fa fa-angle-double-left text-primary"></i>', previous: '<small class="text-primary">Prev</small>', next: '<small class="text-primary">Next</small>', last: '<i class="fa fa-angle-double-right text-primary"></i>' }
  },
  ordering: true,
  info: true,
  searching: true,
  pageLength: 10,

  columnDefs: [
    { className: "dt-head-center", targets: "_all" }
  ]
  // End of data table settings
};
