import "./globals.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<main className="px-4 py-8 md:py-16 md:px-8 max-w-4xl mx-auto">
					{children}
				</main>
			</body>
		</html>
	);
}
