import defaultImg from "../assets/img/default.svg";
export default function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
  const target = e.target as HTMLImageElement;
  target.onerror = null;
  target.src = defaultImg;
};