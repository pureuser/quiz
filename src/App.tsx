import { useEffect, useState } from 'react'

type ProduceType = 'Fruit' | 'Vegetable'

type ITEM = {
    type: ProduceType
    name: string
}

type TimerIdsMap = {
    [key: string]: number
}

const ProduceSorter = () => {
    const initialItems: ITEM[] = [
        { type: 'Fruit', name: 'Apple' },
        { type: 'Vegetable', name: 'Broccoli' },
        { type: 'Vegetable', name: 'Mushroom' },
        { type: 'Fruit', name: 'Banana' },
        { type: 'Vegetable', name: 'Tomato' },
        { type: 'Fruit', name: 'Orange' },
        { type: 'Fruit', name: 'Mango' },
        { type: 'Fruit', name: 'Pineapple' },
        { type: 'Vegetable', name: 'Cucumber' },
        { type: 'Fruit', name: 'Watermelon' },
        { type: 'Vegetable', name: 'Carrot' },
    ]

    const [mainList, setMainList] = useState<ITEM[]>(initialItems)
    const [fruits, setFruits] = useState<ITEM[]>([])
    const [vegetables, setVegetables] = useState<ITEM[]>([])
    const [timerIds, setTimerIds] = useState<TimerIdsMap>({})

    const moveToCategory = (item: ITEM, index: number) => {
        // Remove from main list
        const newMainList = [...mainList]
        newMainList.splice(index, 1)
        setMainList(newMainList)

        // Add to appropriate category
        if (item.type === 'Fruit') {
            setFruits((prevFruits) => [...prevFruits, item])
        } else {
            setVegetables((prevVegs) => [...prevVegs, item])
        }

        // Set 5-second timer to move back
        const timerId = setTimeout(() => {
            if (item.type === 'Fruit') {
                setFruits((prevFruits) =>
                    prevFruits.filter((fruit) => fruit.name !== item.name)
                )
            } else {
                setVegetables((prevVegs) =>
                    prevVegs.filter((veg) => veg.name !== item.name)
                )
            }
            setMainList((prevList) => [...prevList, item])
        }, 5000)

        // Store timer ID for cleanup
        setTimerIds((prev) => ({ ...prev, [item.name]: timerId }))
    }

    const moveBackToMain = (item: ITEM, category: ProduceType) => {
        // Clear the timer
        if (timerIds[item.name]) {
            clearTimeout(timerIds[item.name])

            // Remove timer id from state
            const newTimerIds = { ...timerIds }
            delete newTimerIds[item.name]
            setTimerIds(newTimerIds)
        }

        // Remove from category
        if (category === 'Fruit') {
            setFruits((prevFruits) =>
                prevFruits.filter((fruit) => fruit.name !== item.name)
            )
        } else {
            setVegetables((prevVegs) =>
                prevVegs.filter((veg) => veg.name !== item.name)
            )
        }

        // Add to main list
        setMainList((prevList) => [...prevList, item])
    }

    // Cleanup timers on unmount
    useEffect(() => {
        return () => {
            Object.values(timerIds).forEach((id) => clearTimeout(id))
        }
    }, [timerIds])

    return (
        <div className="flex flex-col p-4 gap-4">
            <h1 className="text-2xl font-bold text-center">Produce Sorter</h1>

            <div className="grid grid-cols-3 gap-4">
                {/* Main List */}
                <div className="border p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 text-center">
                        Items
                    </h2>
                    <div className="flex flex-col gap-2">
                        {mainList.map((item, index) => (
                            <button
                                key={`main-${item.name}-${index}`}
                                onClick={() => moveToCategory(item, index)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
                            >
                                {item.name} ({item.type})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Fruits Column */}
                <div className="border p-4 rounded-lg bg-red-50">
                    <h2 className="text-xl font-semibold mb-4 text-center text-red-600">
                        Fruits
                    </h2>
                    <div className="flex flex-col gap-2">
                        {fruits.map((item, index) => (
                            <button
                                key={`fruit-${item.name}-${index}`}
                                onClick={() => moveBackToMain(item, 'Fruit')}
                                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Vegetables Column */}
                <div className="border p-4 rounded-lg bg-green-50">
                    <h2 className="text-xl font-semibold mb-4 text-center text-green-600">
                        Vegetables
                    </h2>
                    <div className="flex flex-col gap-2">
                        {vegetables.map((item, index) => (
                            <button
                                key={`veg-${item.name}-${index}`}
                                onClick={() =>
                                    moveBackToMain(item, 'Vegetable')
                                }
                                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors"
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProduceSorter
