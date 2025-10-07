// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  title: "International Ecademy",
  apiPath: "http://localhost:5001/",

  // Fee settings
  registrationAmt: 15000,
  tuitionAmt: 35000,

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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
