import "./globals.css";

export const metadata = {
  title: "RK Saloon",
  description: "RK Saloon Open or Close Status",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
