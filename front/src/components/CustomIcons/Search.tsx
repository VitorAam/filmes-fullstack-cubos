import type { SVGProps } from "react";
const Search = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill={props.color ?? "#121113"}
      d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14m0 2a5 5 0 0 0-1.684.292l-.23.089a5 5 0 0 0-1.443.914l-.178.17A5 5 0 0 0 6.48 8.86l-.1.226A5 5 0 0 0 6 11l.005.102a1 1 0 0 0 1.99 0L8 11c0-.394.078-.784.229-1.148l.125-.266a3 3 0 0 1 .525-.707l.218-.198a3 3 0 0 1 .755-.452l.278-.1A3 3 0 0 1 11 8a1 1 0 1 0 0-2"
    />
    <path
      stroke={props.color ?? "#121113"}
      strokeLinecap="round"
      strokeWidth={2}
      d="m20 20-2-2"
    />
  </svg>
);
export default Search;