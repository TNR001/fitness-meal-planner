import './globals.css'

export const metadata = {
  title: 'FitMeals',
  description: 'Get meal suggestions based on your fitness goal & location',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen">{children}</body>
    </html>
  )
}
