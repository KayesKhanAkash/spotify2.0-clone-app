import React from "react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import { SiFacebook } from "react-icons/si";
import { Link } from "react-router-dom";

const PlayerFooter = () => {
  const company = [
    {
      title: "About",
      url: "https://www.spotify.com/bd-en/about-us/contact/",
    },
    {
      title: "Jobs",
      url: "https://www.lifeatspotify.com/",
    },
    {
      title: "For the Record",
      url: "https://www.spotify.com/bd-en/about-us/contact/",
    },
  ];

  const communities = [
    {
      title: "For Artists",
      url: "https://artists.spotify.com/home",
    },
    {
      title: "Developers",
      url: "https://developer.spotify.com/",
    },
    {
      title: "Advertising",
      url: "https://ads.spotify.com/en-US/",
    },
    {
      title: "Investors",
      url: "https://investors.spotify.com/home/default.aspx",
    },
    {
      title: "Vendors",
      url: "https://spotifyforvendors.com/",
    },
    {
      title: "Spotify for Work",
      url: "https://spotifyforvendors.com/",
    },
  ];

  const useFullLinks = [
    {
      title: "Support",
      url: "https://support.spotify.com/us/",
    },
    {
      title: "Free Mobile App",
      url: "https://www.spotify.com/bd-en/download/windows/",
    },
  ];

  const socialLinks = [
    {
      icon: <AiOutlineInstagram />,
      url: "https://www.instagram.com/spotify/",
    },
    {
      icon: <SiFacebook />,
      url: "https://www.facebook.com/Spotify",
    },
    {
      icon: <AiOutlineTwitter />,
      url: "https://twitter.com/spotify",
    },
  ];

  const copyRightLinks = [
    {
      title: "Legal",
      url: "https://www.spotify.com/bd-en/legal/end-user-agreement/",
    },
    {
      title: "Privacy Center",
      url: "https://www.spotify.com/bd-en/privacy",
    },
    {
      title: "Privacy Policy",
      url: "https://www.spotify.com/bd-en/legal/privacy-policy/",
    },
    {
      title: "Cookies",
      url: "https://www.spotify.com/bd-en/legal/cookies-policy/",
    },
    {
      title: "About Ads",
      url: "https://www.spotify.com/bd-en/legal/privacy-policy/#s3",
    },
  ];

  const styles = {
    footerContainer: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-20 gap-y-9 [&_h2]:text-base px-4 md:px-6`,
    link: "text-bold text-sm hover:text-white hover:underline",
    liTag: "leading-relaxed mb-2",
    ul: "mt-4",
    socialLink: `w-full h-full text-white text-lg text-bold flex justify-center items-center bg-[#292929] transition-colors hover:bg-[#6c6c6c]`,
    socialLi: "rounded-full h-10 w-10 overflow-hidden",
  };

  return (
    <footer className="player-footer">
      <div className={styles.footerContainer}>
        <div className="company">
          <h2>Company</h2>
          <ul className={styles.ul}>
            {company.map((link) => (
              <li key={link.title} className={styles.liTag}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.link}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/*Communities  */}
        <div className="communities">
          <h2>Communities</h2>
          <ul className={styles.ul}>
            {communities.map((link) => (
              <li key={link.title} className={styles.liTag}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.link}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* usefull links */}

        <div className="useFullLinks">
          <h2>Useful links</h2>
          <ul className={styles.ul}>
            {useFullLinks.map((link) => (
              <li key={link.title} className={styles.liTag}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.link}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* social links */}

        <div className="social-links">
          <h2 className="invisible">Social Links</h2>
          <ul className="flex gap-4 mt-4">
            {socialLinks.map((link) => (
              <li className={styles.socialLi} key={link.url}>
                <a
                  href={link.url}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* copyright */}
      <hr className="my-10 mx-6" />

      <div className="copyright pb-20">
        <div className="flex justify-between flex-col items-center text-sm px-6 md:flex-row">
          <ul className="flex gap-4">
            {copyRightLinks.map((link) => (
              <li key={link.title}>
                <a href={link.url} className={styles.link}>
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
          <p>© 2023 Spotify AB</p>
        </div>
      </div>
    </footer>
  );
};

export default PlayerFooter;
