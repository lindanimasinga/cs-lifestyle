import { StoreProfile } from '../app/model/models';

export const environment = {
  production: true,
  storeId: "d4bf58f4-44eb-4402-8ee9-b457c263833e",
  storeType: StoreProfile.StoreTypeEnum.CLOTHING,
  messengerId: "ffd4c856-644f-4453-a5ed-84689801a747",
  izingaUrl: "https://api.izinga.co.za",
  izingaMasterpassUrl: "https://ellyw5af54.execute-api.af-south-1.amazonaws.com/prod/ukheshe-masterpass-code",
  ukhesheUrl: "https://api2.ukheshe.co.za",
  ukhesheAppleUrl: "https://apps.apple.com/za/app/ukheshe/id1350353337",
  ukhesheAndroidUrl: "https://play.google.com/store/apps/details?id=guru.jini.ukheshe&hl=en_ZA&gl=US",
  ukhesheMainShopAccount: "0812815707",
  ukhesheCustomerId: 534,
  ozow_api_key: "760c42eec84640cf98aa1558135a9d90",
  ozow_private_key: "c4f1563a347d437280c3b20922dc6b3d",
  ozow_base_url: "https://api.ozow.com",
  ozow_site_code: "CUR-CEL-001",
  ozow_country_code: "ZA",
  ozow_currency_code: "ZAR",
  ozo_payment_notify_url: `${window.location.origin}/payment`,
  ozow_succeess_url: `${window.location.origin}/payment`,
  ozow_payment_cancel_url:`${window.location.origin}/payment`,
  ozow_error_url: `${window.location.origin}/payment`,
  ozow_is_a_test: false,
  payFastUrl: "https://wwww.payfast.co.za/eng/process",
  payfast_merchant_id: "11522007",
  payfast_merchant_key: "xr8z5udsdz9t9"
};
