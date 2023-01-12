import { FC, memo } from "react";

const GranityLogo: FC = () => {
    return (
        <>
            <svg
                width="59"
                height="68"
                viewBox="0 0 59 68"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <rect width="59" height="68" fill="url(#pattern0)" />
                <defs>
                    <pattern
                        id="pattern0"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                    >
                        <use
                            xlinkHref="#image0_18_26"
                            transform="translate(0 -0.00130719) scale(0.0222222 0.019281)"
                        />
                    </pattern>
                    <image
                        id="image0_18_26"
                        width="45"
                        height="52"
                        xlinkHref="data:image/png;base64,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"
                    />
                </defs>
            </svg>
        </>
    );
};

export default memo(GranityLogo);
