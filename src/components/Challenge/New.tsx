import { useContext, useRef, useState } from 'react'

import { ChallengesContext } from '../../store/challenges-context'
import Modal from '../Modal/Modal'

import { motion } from 'framer-motion'

import images from '../../assets/images'

const New = ({ onDone }: { onDone: () => {} }) => {
    const title = useRef<HTMLInputElement>(null)
    const description = useRef<HTMLTextAreaElement>(null)
    const deadline = useRef<HTMLInputElement>(null)

    const [selectedImage, setSelectedImage] = useState({})
    const { addChallenge } = useContext(ChallengesContext)

    function handleSelectImage(image: object) {
        setSelectedImage(image)
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        const challenge = {
            title: title.current?.value,
            description: description.current?.value,
            deadline: deadline.current?.value,
            image: selectedImage,
        }

        if (
            !challenge.title?.trim() ||
            !challenge.description ||
            !challenge.deadline?.trim() ||
            !challenge.image
        ) {
            return
        }

        onDone()
        addChallenge(challenge)
    }

    return (
        <Modal title="New Challenge" onClose={onDone}>
            <form id="new-challenge" onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" ref={title} />
                </p>

                <p>
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        ref={description}
                    ></textarea>
                </p>

                <p>
                    <label htmlFor="deadline">Deadline</label>
                    <input
                        type="date"
                        name="deadline"
                        id="deadline"
                        ref={deadline}
                    />
                </p>

                <motion.ul
                    id="new-challenge-images"
                    variants={{
                        visible: { transition: { staggerChildren: 0.05 } },
                    }}
                >
                    {images.map((image) => (
                        <motion.li
                            variants={{
                                hidden: { opacity: 0, scale: 0.5 },
                                visible: { opacity: 1, scale: 1 },
                            }}
                            exit={{ opacity: 1, scale: 1 }}
                            transition={{ type: 'spring' }}
                            key={image.alt}
                            onClick={() => handleSelectImage(image)}
                            className={
                                selectedImage === image ? 'selected' : undefined
                            }
                        >
                            <img {...image} />
                        </motion.li>
                    ))}
                </motion.ul>

                <p className="new-challenge-actions">
                    <button type="button" onClick={onDone}>
                        Cancel
                    </button>
                    <button>Add Challenge</button>
                </p>
            </form>
        </Modal>
    )
}

export default New
