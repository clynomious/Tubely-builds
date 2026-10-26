# Tubely builds

Public beta APKs for Tubely, a native Android avatar overlay and live streaming studio app.

- Package: `dev.tubely`
- Android: 8.0 (API 26) or newer
- Release downloads: [GitHub Releases](https://github.com/clynomious/Tubely-builds/releases)
- Latest beta: [Tubely 0.1.0 Beta 4](https://github.com/clynomious/Tubely-builds/releases/tag/v0.1.0-beta.4)

Beta 4 adds the compact TikTok chat/statistics monitor using the unofficial PirateTok protocol, independent opacity and click-through recovery, standard Android app/screen capture selection, and optional 1080p. The mascot minimizes the panel; opacity is bottom-left; top-right End stream requires confirmation. Drag the corner to resize. ECO remains the default for lower-end devices; sustained performance and real broadcasts remain unverified. YouTube account integration requires external Google Cloud/OAuth configuration; manual server URL and stream key entry is available.

Release validation: 44 JVM tests passed; release lint completed with 0 errors and 98 warnings; signed R8 release APK verified with the same certificate as previous betas. OSV found no advisories for 124 resolved runtime dependencies. ADB update installation succeeded and the confirmation dialog was observed; full device interaction, real streaming/chat and sustained performance are not accepted by these checks. See the release notes and attached validation reports for limitations.

Download the APK asset from a release page and install it on Android. Android may ask you to allow installs from the app used to open the downloaded APK. Keep the signing certificate consistent when updating an installed copy.

This repository distributes build artifacts and release notes. The application source is maintained separately.
