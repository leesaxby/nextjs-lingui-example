import React from 'react'
import { useRouter } from 'next/router'
import Image from "next/image";
import styles from "@/styles/Home.module.css";

type LOCALES = 'en' | 'cy' | 'pseudo';

const setLocaleCookie = (locale: string) => document.cookie = `NEXT_LOCALE=${locale}; max-age=99; path=/`

export const LangSwitcher = () => {
    const router = useRouter()

    const handleLocaleChange = (locale: LOCALES) => {
        setLocaleCookie(locale);
        router.push(router.pathname, router.pathname, { locale })
    }

    const buttonStateStyles = (locale: string) => router.locale === locale ? styles.langButtonSelected : ''

    return (
        <div className={styles.grid}>
            <button
                className={`${styles.langButton} ${buttonStateStyles('en')}`}
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
                className={`${styles.langButton}  ${buttonStateStyles('cy')}`}
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
                className={`${styles.langButton} ${styles.pseudoButton} ${buttonStateStyles('pseudo')}`}
                onClick={() => {handleLocaleChange('pseudo')}}>
                    PSEUDO
            </button>
        </div>
    )
}
