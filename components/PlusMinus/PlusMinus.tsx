import React  from 'react'
import styles from "@/styles/Home.module.css";

export const PlusMinus = ({count, updateCount}: {count: number; updateCount: (count: number) => void}) => {
    const handleMinus = () => updateCount(count === 0 ? 0 : --count)
    const handlePlus = () => updateCount(++count)

    return (
        <div className={styles.grid}>
            <button
                className={styles.plusMinusButton}
                onClick={handleMinus}>
                -
            </button>

            <button
                className={styles.plusMinusButton}
                onClick={handlePlus}>
                +
            </button>
        </div>
    )
}
