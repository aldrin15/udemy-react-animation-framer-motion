import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { motion } from 'framer-motion'
import New from '../Challenge/New'

const Header = () => {
    const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState(false)

    function handleStartAddNewChallenge() {
        setIsCreatingNewChallenge(true)
    }

    function handleDone() {
        setIsCreatingNewChallenge(false)
    }

    return (
        <>
            <AnimatePresence>
                {isCreatingNewChallenge && <New onDone={handleDone} />}
            </AnimatePresence>

            <header id="main-header">
                <h1>Your Challenges</h1>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                    onClick={handleStartAddNewChallenge}
                    className="button"
                >
                    Add Challenge
                </motion.button>
            </header>
        </>
    )
}

export default Header
