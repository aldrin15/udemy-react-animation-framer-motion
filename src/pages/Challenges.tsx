import Challenges from '../components/Challenge/Challenges'
import Header from '../components/Header/Header'
import ChallengesContextProvider from '../store/challenges-context'

const ChallengesPage = () => {
    return (
        <ChallengesContextProvider>
            <Header />
            <main>
                <Challenges />
            </main>
        </ChallengesContextProvider>
    )
}

export default ChallengesPage
