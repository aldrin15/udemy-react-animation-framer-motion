import Badge from '../Badge/Badge'
import { motion } from 'framer-motion'

const TabItem = ({
    isSelected,
    onSelect,
    badgeCaption,
    children,
}: {
    isSelected: boolean
    onSelect: () => {}
    children: string | JSX.Element | JSX.Element[]
}) => {
    return (
        <li>
            <button
                className={isSelected ? 'selected' : undefined}
                onClick={onSelect}
            >
                {children}
                <Badge key={badgeCaption} caption={badgeCaption}></Badge>
            </button>
            {isSelected && (
                <motion.div
                    layoutId="tab-indicator"
                    className="active-tab-indicator"
                />
            )}
        </li>
    )
}

const Tabs = ({
    selectedType,
    onSelectType,
    challenges,
    children,
}: {
    selectedType: {}
    onSelectType: (val: string) => {}
    children: string | JSX.Element | JSX.Element[]
}) => {
    return (
        <>
            <menu id="tabs">
                <TabItem
                    isSelected={selectedType === 'active'}
                    onSelect={() => onSelectType('active')}
                    badgeCaption={challenges.active.length}
                >
                    Active
                </TabItem>
                <TabItem
                    isSelected={selectedType === 'completed'}
                    onSelect={() => onSelectType('completed')}
                    badgeCaption={challenges.completed.length}
                >
                    Completed
                </TabItem>
                <TabItem
                    isSelected={selectedType === 'failed'}
                    onSelect={() => onSelectType('failed')}
                    badgeCaption={challenges.failed.length}
                >
                    Failed
                </TabItem>
            </menu>
            <div>{children}</div>
        </>
    )
}

export default Tabs
