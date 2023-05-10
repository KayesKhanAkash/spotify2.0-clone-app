// httmps://developer.spotify.com/
// documentation/web-playback-sdk/quick-start/#

export const authEndpoint = "https://accounts.spotify.com/authorize";

// const redirectUrl = "http://192.168.31.198:3000/";
// const redirectUrl = "http://192.168.0.107:3000/";
const redirectUrl = "http://localhost:3000/";

const clientId = "b22c063245c6443683da2f7c491ceb76"; // for kayeskhanakash@gmail.com
// const clientId = "5a885fa7670749e28b764e26016c3539"; //for heartlesskhan@gmail.com

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-follow-read",
  "user-follow-modify",
  "user-library-modify",
  "user-modify-playback-state",
  "playlist-modify-private",
  "playlist-modify-public",
];

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
