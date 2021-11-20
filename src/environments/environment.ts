// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { StoreProfile } from '../app/model/models';

export var environment = {
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
  ozo_payment_notify_url: "https://h1eub1c3w8.execute-api.af-south-1.amazonaws.com/default",
  ozow_succeess_url: `${window.location.origin}/payment`,
  ozow_payment_cancel_url:`${window.location.origin}/payment`,
  ozow_error_url: `${window.location.origin}/payment`,
  ozow_is_a_test: false,
  payFastUrl: "https://sandbox.payfast.co.za/eng/process",
  payfast_merchant_id: "10022392",
  payfast_merchant_key: "os0ltelv1gepy",
  firebase_apiKey: "AIzaSyB1KhGf_VDF8VDUT0pNddLXB1Hls_dtR0U",
  authDomain: "ijudi-d19bd.firebaseapp.com",
  databaseURL: "https://ijudi-d19bd.firebaseio.com",
  projectId: "ijudi-d19bd",
  storageBucket: "ijudi-d19bd.appspot.com",
  messagingSenderId: "315529266651",
  appId: "1:315529266651:web:b28ea03f57c4d432ed53fe",
  measurementId: "G-ZJRDF78RJX"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
