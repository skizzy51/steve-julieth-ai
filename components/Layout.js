import Head from "next/head"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Julieth AI assessment</title>
                <meta
                    name="description"
                    content="Steve Obi's submisssion for Julieth AI assessment"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={inter.className}>{children}</main>
        </>
    )
}
