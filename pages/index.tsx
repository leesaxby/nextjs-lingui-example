import {LangSwitcher} from "@/components";
import {Trans} from "@lingui/macro";
import Head from 'next/head'
import {GetStaticPropsContext} from "next";
import {loadTranslation} from "@/libs/utils/lingui-setup";
import styles from '../styles/Home.module.css'
import Link from "next/link";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Home | NextJs Lingui Example</title>
            </Head>

            <main className={styles.main}>
                <LangSwitcher />

                <h1 className={styles.title}>
                    <Trans id="home-heading">
                        NextJs Lingui Example
                    </Trans>
                </h1>
                <p className={styles.description}>
                    <Trans id="home-description">
                        Example of how to use nextJs and Lingui internationalisation.<br/>
                        On this page we are using ids for the translations.
                    </Trans>
                </p>

                <section className={styles.linksSection}>
                    <Link href="/plurals" className={styles.link}>
                        <Trans id="home-plurals-link">
                            Dealing with plurals
                        </Trans>
                    </Link>
                </section>
            </main>
        </div>
    )
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
    const translation = await loadTranslation(
        ctx.locale!,
    )
    return {
        props: {
            translation
        }
    }
}
