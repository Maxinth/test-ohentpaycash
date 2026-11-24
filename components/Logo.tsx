import Image from "next/image";
import clsx from "clsx";
interface Props {
  type: "header" | "footer";
}
const Logo = ({ type }: Props) => {
  return (
    <div
      className={clsx(
        "flex items-center font-display text-xl font-bold tracking-tight",
        type === "header" ? "-space-x-1" : "space-x-1",
      )}
    >
      <Image
        src={type === "header" ? "/inverted_logo.svg" : "logo_original.svg"}
        alt="ohentpaycash logo"
        width={40}
        height={40}
      />
      <span>OhentPayCash</span>
    </div>
  );
};

export default Logo;
