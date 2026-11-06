import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy | Tubely' };

export default function PrivacyPage() {
  return (
    <main className="wrap privacy-page">
      <a href="/">Back to Tubely</a>
      <h1>Privacy Policy</h1>
      <p>Tubely is a PNGTuber and live streaming app for Android. It stores avatar profiles, imported images, and settings on your device. If you export a profile, Tubely writes the backup to the location you select.</p>

      <h2>YouTube connection</h2>
      <p>If you connect YouTube in Studio, Tubely uses the access you grant to read your channel identity, broadcast details, and streaming settings, including the ingest address and stream key. Studio uses these details to display your channel and to create, bind, and manage your YouTube Live broadcasts.</p>
      <p>Tubely keeps the Google access token in app memory and sends it to Google over HTTPS to authorize YouTube API requests. The direct YouTube connection does not send your Google access token to the Restream service. If you choose a thumbnail, Tubely uploads it to YouTube. When you start streaming, Tubely sends your selected audio and video to the streaming destination you selected.</p>
      <p>Tubely uses Google user data to provide these YouTube features. Its use of information received from Google APIs adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy">Google API Services User Data Policy</a>, including its Limited Use requirements.</p>

      <h2>On-device features and overlays</h2>
      <p>Tubely uses microphone input for avatar animation and, when selected, for live streaming. The optional local or LAN overlay serves avatar images and animation state to devices that can reach the overlay URL. Stop the overlay to end access.</p>

      <h2>Disconnect and delete data</h2>
      <p>Use Disconnect in Studio to clear the active YouTube connection in Tubely. To revoke access at Google, remove Tubely from your <a href="https://myaccount.google.com/connections">Google Account connections</a>. You can manage or delete broadcasts and thumbnails in YouTube Studio. Uninstalling Tubely removes private app data from your device. You can delete exported backups wherever you saved them.</p>

      <h2>Contact</h2>
      <p>For questions about this policy or requests about your data, email <a href="mailto:clynomious@gmail.com">clynomious@gmail.com</a>.</p>
    </main>
  );
}
