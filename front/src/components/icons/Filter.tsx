import type { SVGProps } from "react";
const Filter = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <path
            stroke="#121113"
            strokeLinecap="round"
            strokeWidth={2}
            d="M5 12V4M19 20v-2M5 20v-4M19 12V4M12 7V4M12 20v-8"
        />
        <circle
            cx={5}
            cy={14}
            r={2}
            stroke="#121113"
            strokeLinecap="round"
            strokeWidth={2}
        />
        <circle
            cx={12}
            cy={9}
            r={2}
            stroke="#121113"
            strokeLinecap="round"
            strokeWidth={2}
        />
        <circle
            cx={19}
            cy={15}
            r={2}
            stroke="#121113"
            strokeLinecap="round"
            strokeWidth={2}
        />
    </svg>
);
export default Filter;