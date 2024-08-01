import XIcon from "/assets/icons/X.svg";
import DiscordIcon from "/assets/icons/dicord.svg";
import EmailIcon from "/assets/icons/email.svg";
import TelegramIcon from "/assets/icons/email.svg";
const Footer = () => (
  <div className="w-full bg-transparent">
    <div className="container mx-auto flex max-w-[1200px] items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <a
          href={import.meta.env.VITE_GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="h-8 w-8" src={XIcon} alt="GitHub" />
        </a>
        <a
          href={import.meta.env.VITE_DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="h-8 w-8" src={DiscordIcon} alt="Discord" />
        </a>
        <a href={import.meta.env.VITE_EMAIL_URL}>
          <img className="h-8 w-8" src={EmailIcon} alt="Email" />
        </a>
        <a
          href={import.meta.env.VITE_TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="h-8 w-8" src={TelegramIcon} alt="Telegram" />
        </a>
      </div>

      <div className="text-sm text-white">
        © 2024 SURGE All Rights Reserved.
      </div>
    </div>
  </div>
);

export default Footer;
