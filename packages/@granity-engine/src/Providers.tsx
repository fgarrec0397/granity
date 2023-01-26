import { HasChildren } from "@granity/helpers";
import AppProvider from "@granity-engine/App/Core/_actions/_data/providers/AppProvider";
import { FC } from "react";

type Props = HasChildren;

const Providers: FC<Props> = ({ children }) => <AppProvider>{children}</AppProvider>;

export default Providers;
