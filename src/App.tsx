import { useState } from 'react'

interface Item {
    type: 'Fruit' | 'Vegetable'
    name: string
}

const initialItems: Item[] = [
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

export default function ProduceSorter() {
    const [mainList, setMainList] = useState<Item[]>(initialItems) // All items
    const [fruits, setFruits] = useState<Item[]>([]) // Fruits
    const [vegetables, setVegetables] = useState<Item[]>([]) // Vegetables

    const moveItem = (item: Item): void => {
        // Move item to fruits or vegetables
        setMainList((prev) => prev.filter((i) => i !== item))
        if (item.type === 'Fruit') {
            setFruits((prev) => [...prev, item])
        } else {
            setVegetables((prev) => [...prev, item])
        }
        setTimeout(() => {
            returnItem(item) // Return item to main list after 5 seconds
        }, 5000)
    }

    const returnItem = (item: Item): void => {
        // Return item to main list
        setFruits((prev) => prev.filter((i) => i !== item))
        setVegetables((prev) => prev.filter((i) => i !== item))
        setMainList((prev) => [...prev, item])
    }

    return (
        <div className="flex flex-col p-4 gap-4">
            <h1 className="text-2xl font-bold text-center">Produce Sorter</h1>
            <div className="grid grid-cols-3 gap-4">
                <div className="border p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 text-center">
                        Items
                    </h2>
                    <div className="flex flex-col gap-2">
                        {mainList.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => moveItem(item)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
                            >
                                {item.name} ({item.type})
                            </button>
                        ))}
                    </div>
                </div>
                <div className="border p-4 rounded-lg bg-red-50">
                    <h2 className="text-xl font-semibold mb-4 text-center text-red-600">
                        Fruits
                    </h2>
                    <div className="flex flex-col gap-2">
                        {fruits.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => returnItem(item)}
                                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="border p-4 rounded-lg bg-green-50">
                    <h2 className="text-xl font-semibold mb-4 text-center text-green-600">
                        Vegetables
                    </h2>
                    <div className="flex flex-col gap-2">
                        {vegetables.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => returnItem(item)}
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
