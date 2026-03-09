export const metadata = {
  title: "HVAC Quote Builder",
  description: "HVAC pricing and proposal tool"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
