# Tubely builds

Public beta APKs for Tubely, a native Android avatar overlay and live streaming studio app.

- Package: `dev.tubely`
- Android: 8.0 (API 26) or newer
- Release downloads: [GitHub Releases](https://github.com/clynomious/Tubely-builds/releases)
- Latest beta: [Tubely 0.1.0 Beta 5](https://github.com/clynomious/Tubely-builds/releases/tag/v0.1.0-beta.5)

Beta 5 adds TikTok chat reconnect on stream start, continued retries during broadcasting, microphone noise suppression, adaptive render FPS and reduced chat/transport allocation. The dark monitor has a top-centre drag cue, two fading external lower-corner resize grips and an opacity slider above its controls. Whole-screen sharing includes the actual monitor content; select one game app to exclude it. Private destination controls remain protected. Optional 1080p starts at 24 fps with adaptive performance enabled, or targets 30 fps with it disabled. ECO remains the default. Real broadcasts, chat connectivity, voice quality and sustained device performance remain unverified. YouTube account integration requires external Google Cloud/OAuth configuration; manual server URL and stream key entry is available.

Release validation: 47 JVM tests passed, including synthetic noise-filter regression tests; release lint completed with 0 errors and 102 warnings; signed R8 release APK verified with the same certificate as previous betas. OSV found no advisories for 124 resolved runtime dependencies. Phone installation and device testing were skipped because the device is unavailable. See the release notes and attached validation reports for limitations.

Download the APK asset from a release page and install it on Android. Android may ask you to allow installs from the app used to open the downloaded APK. Keep the signing certificate consistent when updating an installed copy.

This repository distributes build artifacts and release notes. The application source is maintained separately.
