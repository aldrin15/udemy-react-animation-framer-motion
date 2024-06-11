import { useContext, useState } from 'react'
import { ChallengesContext } from '../../store/challenges-context'
import Tabs from './Tabs'
import { AnimatePresence, motion } from 'framer-motion'
import Item from './Item'

const Challenges = () => {
    const { challenges } = useContext(ChallengesContext)
    const [selectedType, setSelectedType] = useState('active')
    const [expanded, setExpanded] = useState(null)

    function handleSelectedType(newType: string) {
        setSelectedType(newType)
    }

    function handleViewDetails(id: string | null) {
        setExpanded((prevId) => (prevId === id ? null : id))
    }

    const filterChallenges = {
        active: challenges.filter(
            (challenge: { status: string }) => challenge.status === 'active'
        ),
        completed: challenges.filter(
            (challenge: { status: string }) => challenge.status === 'completed'
        ),
        failed: challenges.filter(
            (challenge: { status: string }) => challenge.status === 'failed'
        ),
    }

    const displayedChallenges = filterChallenges[selectedType]

    return (
        <div id="challenges">
            <Tabs
                selectedType={selectedType}
                onSelectType={handleSelectedType}
                challenges={filterChallenges}
            >
                <AnimatePresence mode="wait">
                    {displayedChallenges.length > 0 && (
                        <motion.ol
                            key="list"
                            className="challenge-items"
                            exit={{ y: -30, opacity: 0 }}
                        >
                            <AnimatePresence>
                                {displayedChallenges.map(
                                    (challenge: {
                                        id: string
                                        deadline: Date
                                        image: {}
                                        title: string
                                        description: string
                                    }) => (
                                        <Item
                                            key={challenge.id}
                                            challenge={challenge}
                                            onViewDetails={() =>
                                                handleViewDetails(challenge.id)
                                            }
                                        ></Item>
                                    )
                                )}
                            </AnimatePresence>
                        </motion.ol>
                    )}

                    {displayedChallenges.length === 0 && (
                        <motion.p
                            key="fallback"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            No Challenges Found.
                        </motion.p>
                    )}
                </AnimatePresence>
            </Tabs>
        </div>
    )
}

export default Challenges
