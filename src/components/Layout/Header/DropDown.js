import { BiLinkExternal } from "react-icons/bi";
import { styles } from "../../../Utils/commonStyles";

const ProfileDrop = ({ show }) => {
  const links = [
    {
      title: "Account",
      extarnal: true,
    },
    {
      title: "Profile",
    },
    {
      title: "Upgrade to Premium",
      extarnal: true,
    },
    {
      title: "Support",
      extarnal: true,
    },
    {
      title: "Download",
      extarnal: true,
    },
    {
      title: "Settings",
      url: "https://open.spotify.com/preferences",
    },
    {
      title: "Log out",
    },
  ];

  return (
    <div
      className={`${
        show
          ? "visible top-[130%] opacity-100"
          : "invisible top-[150%] opacity-0"
      } ${styles.dropContainer} -left-40  lg:-left-20`}
    >
      <ul>
        {links.map((link, index) => (
          <li
            key={index}
            className={`${
              links.length - 1 === index ? "border-t border-[#454545]" : ""
            }`}
          >
            <a href={link.url} className={`${styles.dropLink}`}>
              <span>{link.title}</span>

              {link.extarnal && <BiLinkExternal className="text-lg" />}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { ProfileDrop };
