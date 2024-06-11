import { createContext, useState } from 'react'

export const ChallengesContext = createContext({
    challenges: [],
    addChallenge: (challenge: {}) => {},
    updateChallengeStatus: (challengeId: string, newStatus: string) => {},
})

const ChallengesContextProvider = ({
    children,
}: {
    children: string | JSX.Element | JSX.Element[]
}) => {
    const [challenges, setChallenges] = useState([])

    function addChallenge(challenge: {}) {
        setChallenges((prevChallenges) => [
            {
                ...challenge,
                id: Math.random().toString(),
                status: 'active',
            },
            ...prevChallenges,
        ])
    }

    function deleteChallenge(challengeId: string) {
        setChallenges((prevChallenges) =>
            prevChallenges.filter(
                (challenge: { id: string }) => challenge.id !== challengeId
            )
        )
    }

    function updateChallengeStatus(challengeId: string, newStatus: string) {
        setChallenges((prevChallenges) =>
            prevChallenges.map((challenge) => {
                if (challenge.id === challengeId) {
                    return { ...challenge, status: newStatus }
                }

                return challenge
            })
        )
    }

    const challengesContext = {
        challenges,
        addChallenge,
        deleteChallenge,
        updateChallengeStatus,
    }

    return (
        <ChallengesContext.Provider value={challengesContext}>
            {children}
        </ChallengesContext.Provider>
    )
}

export default ChallengesContextProvider
