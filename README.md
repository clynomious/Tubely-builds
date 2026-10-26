# Tubely builds

Public beta APKs for Tubely, a native Android avatar overlay and live streaming studio app.

- Package: `dev.tubely`
- Android: 8.0 (API 26) or newer
- Release downloads: [GitHub Releases](https://github.com/clynomious/Tubely-builds/releases)
- Latest beta: [Tubely 0.1.0 Beta 6](https://github.com/clynomious/Tubely-builds/releases/tag/v0.1.0-beta.6)

Beta 6 adds independent stream FPS selection up to 60 fps, always-visible external quarter-circle resize grips aligned to the dark chat panel corners, and a compact icon-only footer. Resize begins from the actual window size. Default FPS preserves the previous low-end presets; explicit 60 fps becomes the encoder/render target, subject to hardware/source support and adaptive load/thermal limits. Chat reconnect, microphone noise suppression, independent opacity and touchable unlock recovery remain. Whole-screen sharing includes the monitor; select one game app to exclude it. Private destination controls remain protected. Real broadcasts, chat connectivity, voice quality, 60 fps operation and sustained device performance remain unverified. YouTube account integration requires external Google Cloud/OAuth configuration; manual server URL and stream key entry is available.

Release validation: 52 JVM tests passed, including persisted FPS compatibility and corner geometry across display densities; release lint completed with 0 errors and 101 warnings; signed R8 release APK verified with the same certificate as previous betas. OSV found no advisories for 124 resolved runtime dependencies. Phone installation and device testing were skipped because the device is unavailable. See the release notes and attached validation reports for limitations.

Download the APK asset from a release page and install it on Android. Android may ask you to allow installs from the app used to open the downloaded APK. Keep the signing certificate consistent when updating an installed copy.

This repository distributes build artifacts and release notes. The application source is maintained separately.
