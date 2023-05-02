import {useState} from 'react';
import {LangSwitcher, PlusMinus} from "@/components";
import {Trans, Plural} from "@lingui/macro";
import Head from 'next/head'
import {GetStaticPropsContext} from "next";
import {loadTranslation} from "@/libs/utils/lingui-setup";
import styles from '../styles/Home.module.css'

export default function Home() {
    const [languageCount, setLanguageCount ] = useState(1)
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

                <h1 className={styles.subTitle}>
                    <Trans id="home-subHeading">
                        Dealing with plurals
                    </Trans>
                </h1>

                <p className={styles.pluralDescription}>
                    <Plural
                        value={languageCount}
                        one="Whe have # Developer"
                        other="We have # Developers"
                        id="home-plurals-description"
                    />
                </p>

                <PlusMinus
                    count={languageCount}
                    updateCount={setLanguageCount}/>

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
