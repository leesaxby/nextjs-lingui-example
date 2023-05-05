import {useState} from 'react';
import {LangSwitcher, PlusMinus} from "@/components";
import {Trans, Plural} from "@lingui/macro";
import Head from 'next/head'
import Link from 'next/link'
import {GetStaticPropsContext} from "next";
import {loadTranslation} from "@/libs/utils/lingui-setup";
import styles from '../styles/Home.module.css'

export default function Index() {
    const [languageCount, setLanguageCount ] = useState(1)
    return (
        <div className={styles.container}>
            <Head>
                <title>Plurals | NextJs Lingui Example</title>
            </Head>

            <main className={styles.main}>
                <LangSwitcher />

                <h1 className={styles.title}>
                    <Trans id="plurals-heading">
                        Dealing with plurals
                    </Trans>
                </h1>

                <PlusMinus
                    count={languageCount}
                    updateCount={setLanguageCount}/>


                <p className={styles.description}>
                    <Plural
                        value={languageCount}
                        one="We have # Language"
                        other="We have # Languages"
                        id="plurals-description"
                    />
                </p>

                <section className={styles.linksSection}>
                    <Link href="/" className={styles.link}>
                        <Trans id="plurals-home-link">
                            Home
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
