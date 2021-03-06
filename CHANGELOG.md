# Changelog

## 1.0.0 - 2022-06-27

* Fix - The css is now fine even on the smaller screens.
* Fix - The debug module route has been disabled (the files are still present in the project).

## 0.0.4 - 2022-06-26

* Fix - Fixed the showed quotes when edited with an active search filter.
* Fix - The no quotes available component is only displayed when really needed.
* Enhancement - Cleaned the environment files.

## 0.0.3 - 2022-06-26

* Add - The quote service fully supports the Firebase apis along with the relative quote module.
* Enhancement - The discover module has been improved for the type support (still not working with Firebase sadly).

## 0.0.2 - 2022-06-25

* Add - Added sign-in with Google through Firebase.
* Add - The whole application routes are now guarded (the user must be logged in).
* Add - The cookie for the suggested quote is now unique for each user.

## 0.0.1 - 2022-06-22

* Add - The first sf-quotes alpha release. It does rely on json-server for mocking the backend. A future release will be
  based on Firebase.
