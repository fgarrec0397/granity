import { HasChildren } from "@granity/helpers";

type Props = HasChildren;

const APP_NAME = "next-pwa example";
const APP_DESCRIPTION = "This is an example of using next-pwa plugin";

export const metadata = {
    title: "PWA 💖 Next.js",
    description: APP_DESCRIPTION,
    twitter: {
        card: "summary_large_image",
        creator: "@imamdev_",
        images: "https://example.com/og.png",
    },
    applicationName: APP_NAME,
    appleWebApp: {
        capable: true,
        title: APP_NAME,
        statusBarStyle: "default",
    },
    formatDetection: {
        telephone: false,
    },
    themeColor: "#FFFFFF",
    viewport:
        "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
    manifest: "/manifest.json",
    icons: [
        { rel: "apple-touch-icon", url: "/icons/apple-touch-icon.png" },
        { rel: "shortcut icon", url: "/favicon.ico" },
    ],
    keywords: ["nextjs", "pwa", "next-pwa"],
};

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <head>
                <link rel="manifest" href="/static/manifest.json" />
            </head>
            <body>
                {children}
                <script src="/service-worker.t"></script>
            </body>
        </html>
    );
}
