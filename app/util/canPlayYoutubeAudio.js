const ANDROID_RE = /Android/;
const IPAD_RE = /iPad/;
const IPHONE_RE = /iPhone/;

export default function canPlayYoutubeAudio() {
  // TODO: there's probably more user-agents to add here that can't handle audio, IDK
  // Honestly it'd be better to sniff to see if they *can* do audio instead but... that involves
  // a lot of user agent upkeep D:

  if (!window.navigator) {
    // Node
    return false;
  }

  const ua = navigator.userAgent;
  for (let re of [ANDROID_RE, IPAD_RE, IPHONE_RE]) {
    if (re.test(ua)) {
      return false;
    }
  }

  return true;
}
