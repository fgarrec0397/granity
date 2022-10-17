import { FC } from "react";

type Props = {
    children: React.ReactNode;
};

const FeaturesProvider: FC<Props> = ({ children }) => {
    return <>{children}</>;
};

export default FeaturesProvider;
