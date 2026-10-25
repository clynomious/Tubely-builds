# Tubely builds

Public beta APKs for Tubely, a native Android avatar overlay and live streaming studio app.

- Package: `dev.tubely`
- Android: 8.0 (API 26) or newer
- Release downloads: [GitHub Releases](https://github.com/clynomious/Tubely-builds/releases)
- Latest beta: [Tubely 0.1.0 Beta 3](https://github.com/clynomious/Tubely-builds/releases/tag/v0.1.0-beta.3)

Beta 3 adds Studio Live with screen/game, camera, avatar, image and text layers, manual RTMP/RTMPS publishing, scenes, audio mixing, and an APNG decoder fix. The default ECO preset targets lower-end devices; device performance and real broadcasts have not yet been verified. YouTube account integration requires external Google Cloud/OAuth configuration; manual server URL and stream key entry is available.

Release validation: 38 JVM tests passed; release lint completed with 0 errors and 86 warnings; signed R8 release APK verified with the same certificate as Beta 2. No ADB device was detected for this release. See the release notes and attached validation reports for limitations.

Download the APK asset from a release page and install it on Android. Android may ask you to allow installs from the app used to open the downloaded APK. Keep the signing certificate consistent when updating an installed copy.

This repository distributes build artifacts and release notes. The application source is maintained separately.
