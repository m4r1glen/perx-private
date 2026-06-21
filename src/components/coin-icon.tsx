import { formatLek } from "@/lib/use-marketplace";
import perxCoinUrl from "@/assets/perx-coin.png";

/**
 * Branded PERX coin glyph rendered wherever the Lek currency mark used to
 * be shown as the text " L". Sized in `em` so it tracks the surrounding
 * font-size (badges, prices, totals, voucher receipts, hero numbers).
 */
export function CoinIcon({
  className = "",
  title = "PERX",
  size = "1.25em",
}: {
  className?: string;
  title?: string;
  size?: string;
}) {
  return (
    <img
      src={perxCoinUrl}
      alt={title}
      aria-label={title}
      draggable={false}
      width={32}
      height={32}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      className={`inline-block shrink-0 select-none rounded-full object-contain align-[-0.25em] ${className}`}
    />
  );
}

/**
 * Renders a Lek amount as `<number><CoinIcon/>`. Use in JSX wherever a
 * monetary value is shown. Keeps formatLek() as the single number-formatting
 * source of truth.
 */
export function Lek({
  value,
  className = "",
  iconClassName = "ml-[0.25em]",
  prefix,
}: {
  value: number;
  className?: string;
  iconClassName?: string;
  prefix?: string;
}) {
  return (
    <span className={`inline-flex items-center whitespace-nowrap font-mono-num tabular-nums ${className}`}>
      {prefix}
      {formatLek(value)}
      <CoinIcon className={iconClassName} />
    </span>
  );
}
