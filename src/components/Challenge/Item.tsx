import { useContext } from 'react'
import { ChallengesContext } from '../../store/challenges-context'

import { AnimatePresence, motion } from 'framer-motion'

const Item = ({
    challenge,
    onViewDetails,
    isExpanded,
}: {
    challenge: {
        id: string
        deadline: Date
        image: {}
        title: string
        description: string
    }
    onViewDetails: () => {}
    isExpanded: boolean
}) => {
    const { updateChallengeStatus } = useContext(ChallengesContext)

    const formattedDate = new Date(challenge.deadline).toLocaleDateString(
        'en-US',
        {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }
    )

    function handleCancel() {
        updateChallengeStatus(challenge.id, 'failed')
    }

    function handleComplete() {
        updateChallengeStatus(challenge.id, 'completed')
    }

    return (
        <motion.li layout exit={{ y: -30, opacity: 0 }}>
            <article className="challenge-item">
                <header>
                    <img {...challenge.image} />
                    <div className="challenge-item-meta">
                        <h2>{challenge.title}</h2>

                        <p>Complete until {formattedDate}</p>
                        <p className="challenge-item-actions">
                            <button
                                onClick={handleCancel}
                                className="btn-negative"
                            >
                                Mark as Failed
                            </button>
                            <button onClick={handleComplete}>
                                Mark as Completed
                            </button>
                        </p>
                    </div>
                </header>
                {/* <div
                    className={`challenge-item-details ${
                        isExpanded ? 'expanded' : ''
                    }`}
                > */}
                <div className="challenge-item-details">
                    <p>
                        <button onClick={onViewDetails}>
                            View Details{' '}
                            <motion.span
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                className="challenge-item-details-icon"
                            >
                                &#9650;
                            </motion.span>
                        </button>
                    </p>
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                        >
                            <p className="challenge-item-description">
                                {challenge.description}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </article>
        </motion.li>
    )
}

export default Item
