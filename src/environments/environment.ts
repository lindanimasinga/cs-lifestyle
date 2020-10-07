// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  storeId: "d4bf58f4-44eb-4402-8ee9-b457c263833e",
  izingaUrl: "https://api-uat.izinga.co.za/",
  izingaMasterpassUrl: "https://ellyw5af54.execute-api.af-south-1.amazonaws.com/prod/ukheshe-masterpass-code",
  ukhesheUrl: "https://ukheshe-sandbox.jini.rocks/ukheshe-conductor/rest/v1",
  ukhesheMainShopAccount: "0812815707",
  ukhesheCustomerId: 534,
  ozow_api_key: "EB5758F2C3B4DF3FF4F2669D5FF5B",
  ozow_private_key: "215114531AFF7134A94C88CEEA48E",
  ozow_base_url: "https://api.ozow.com",
  ozow_site_code: "TSTSTE0001",
  ozow_country_code: "ZA",
  ozow_currency_code: "ZAR",
  ozow_succeess_url: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/payment`,
  ozow_cancel_url:`${window.location.protocol}//${window.location.hostname}:${window.location.port}/payment`,
  ozow_error_url: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/payment`,
  ozow_is_a_test: true,
  feesPercentage: 0.032
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
