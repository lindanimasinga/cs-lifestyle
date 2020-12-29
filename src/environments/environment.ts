// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { StoreProfile } from '../app/model/models';

export const environment = {
  production: false,
  storeId: "d4bf58f4-44eb-4402-8ee9-b457c263833e",
  storeType: StoreProfile.StoreTypeEnum.CLOTHING,
  messengerId: "ffd4c856-644f-4453-a5ed-84689801a747",
  izingaUrl: "https://api-uat.izinga.co.za/",
  izingaMasterpassUrl: "https://ellyw5af54.execute-api.af-south-1.amazonaws.com/prod/ukheshe-masterpass-code",
  ukhesheUrl: "https://ukheshe-sandbox.jini.rocks/ukheshe-conductor/rest/v1",
  ukhesheAppleUrl: "https://apps.apple.com/za/app/ukheshe/id1350353337",
  ukhesheAndroidUrl: "https://play.google.com/store/apps/details?id=guru.jini.ukheshe&hl=en_ZA&gl=US",
  ukhesheMainShopAccount: "0812815707",
  ukhesheCustomerId: 534,
  ozow_api_key: "760c42eec84640cf98aa1558135a9d90",
  ozow_private_key: "c4f1563a347d437280c3b20922dc6b3d",
  ozow_base_url: "https://api.ozow.com",
  ozow_site_code: "CUR-CUR-003",
  ozow_country_code: "ZA",
  ozow_currency_code: "ZAR",
  ozo_payment_notify_url: `${window.location.origin}/payment`,
  ozow_succeess_url: `${window.location.origin}/payment`,
  ozow_payment_cancel_url:`${window.location.origin}/payment`,
  ozow_error_url: `${window.location.origin}/payment`,
  ozow_is_a_test: false,
  payFastUrl: "https://sandbox.payfast.co.za/eng/process",
  payfast_merchant_id: "10020746",
  payfast_merchant_key: "cix8odfanpfra",
  firebase_apiKey: "AIzaSyDS5nZrHe5On5jyUUl_mCjr2QRSc_N3Jwo",
  authDomain: "cs-clothing.firebaseapp.com",
  databaseURL: "https://cs-clothing.firebaseio.com",
  projectId: "cs-clothing",
  storageBucket: "cs-clothing.appspot.com",
  messagingSenderId: "705023698499",
  appId: "1:705023698499:web:7d53f4b87c0fe9c3fa56f6",
  measurementId: "G-RYDG5R4HMM"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
