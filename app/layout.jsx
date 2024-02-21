import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] })
const layout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Home | DevSpace</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
export default layout