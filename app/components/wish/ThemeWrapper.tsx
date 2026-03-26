import GoldTheme from "./themes/GoldTheme";
import ColorfulTheme from "./themes/ColorfulTheme";
import DarkTheme from "./themes/DarkTheme";
import TricolorTheme from "./themes/tricolor";
import PinkTheme from "./themes/PinkTheme";
import LightTheme from "./themes/LightTheme";
import WarmTheme from "./themes/WarmTheme";
import PurpleTheme from "./themes/PurpleTheme";
import BlueTheme from "./themes/BlueTheme";
import GreenTheme from "./themes/GreenTheme";

export default function ThemeWrapper({ theme, children }: any) {
  if (theme === "gold") return <GoldTheme>{children}</GoldTheme>;
  if (theme === "colorful") return <ColorfulTheme>{children}</ColorfulTheme>;
  if (theme === "dark") return <DarkTheme>{children}</DarkTheme>;
  if (theme === "tricolor") return <TricolorTheme>{children}</TricolorTheme>;
  if (theme === "pink") return <PinkTheme>{children}</PinkTheme>;
  if (theme === "light") return <LightTheme>{children}</LightTheme>;
  if (theme === "warm") return <WarmTheme>{children}</WarmTheme>;
  if (theme === "purple") return <PurpleTheme>{children}</PurpleTheme>;
  if (theme === "blue") return <BlueTheme>{children}</BlueTheme>;
  if (theme === "green") return <GreenTheme>{children}</GreenTheme>;

  return <div>{children}</div>;
}