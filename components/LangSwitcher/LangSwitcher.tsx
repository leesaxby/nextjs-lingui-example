import React from 'react'
import { useRouter } from 'next/router'
import Image from "next/image";
import styles from "@/styles/Home.module.css";

type LOCALES = 'en' | 'cy' | 'pseudo';

export const LangSwitcher = () => {
    const router = useRouter()
    const handleLocaleChange = (locale: LOCALES) => {
        router.push(router.pathname, router.pathname, { locale })
    }

    return (
        <div className={styles.grid}>
            <button
                className={styles.langButton}
                onClick={() => {handleLocaleChange('en')}}>
                <Image
                    src={`/images/en_flag.svg`}
                    alt="English Language"
                    quality={100}
                    height={170}
                    width={170}
                />
            </button>

            <button
                className={styles.langButton}
                onClick={() => {handleLocaleChange('cy')}}>
                <Image
                    src={`/images/cy_flag.svg`}
                    alt="Welsh Language"
                    quality={100}
                    height={170}
                    width={170}
                />
            </button>

            <button
                className={`${styles.langButton} ${styles.pseudoButton}`}
                style={{
                    height: 178,
                    width: 178,
                }}
                onClick={() => {handleLocaleChange('pseudo')}}>
                    PSEUDO
            </button>
        </div>
    )
}
