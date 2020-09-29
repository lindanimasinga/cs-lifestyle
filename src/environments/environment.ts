// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  storeId: "d4bf58f4-44eb-4402-8ee9-b457c263833e",
  izingaUrl: "https://api-uat.izinga.co.za/",
  ukhesheUrl: "https://ukheshe-sandbox.jini.rocks/ukheshe-conductor/rest/v1",
  mainShopAccount: "0812815707",
  ozow_api_key: "EGYkBM4qz82GvVxVOlUklvPbQrkyIO3h",
  ozow_private_key: "7htslQRtr6Yt70YHzrmODvvLaJFvZzPK",
  ozow_base_url: "https://api.ozow.com",
  ozow_site_code: "MYF-MYF-001",
  ozow_country_code: "ZA",
  ozow_currency_code: "ZAR",
  ozow_succeess_url: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/payment`,
  ozow_cancel_url:`${window.location.protocol}//${window.location.hostname}:${window.location.port}/payment`,
  ozow_error_url: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/payment`,
  ozow_is_a_test: false,
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
