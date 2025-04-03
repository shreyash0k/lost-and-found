export interface Item {
  id: number
  type: "lost" | "found"
  title: string
  location: string
  date: string
  category: string
  description: string
  contact: string
  createdAt: string
}

// Initial sample data
const sampleItems: Item[] = [
  {
    id: 1,
    type: "lost",
    title: "Blue Backpack",
    location: "Central Park",
    date: "2025-04-01",
    category: "Accessories",
    description: "A blue backpack with a laptop and books inside",
    contact: "user1@example.com",
    createdAt: "2025-04-01T10:30:00Z",
  },
  {
    id: 2,
    type: "found",
    title: "House Keys",
    location: "Main Street Cafe",
    date: "2025-03-30",
    category: "Other",
    description: "A set of house keys with a red keychain",
    contact: "user2@example.com",
    createdAt: "2025-03-30T14:15:00Z",
  },
  {
    id: 3,
    type: "lost",
    title: "iPhone 15",
    location: "Downtown Bus Station",
    date: "2025-03-29",
    category: "Electronics",
    description: "A black iPhone 15 with a cracked screen protector",
    contact: "user3@example.com",
    createdAt: "2025-03-29T09:45:00Z",
  },
]

// Get items from localStorage or use sample data if none exist
export function getItems(): Item[] {
  if (typeof window === "undefined") {
    return sampleItems
  }

  const storedItems = localStorage.getItem("lostFoundItems")
  if (!storedItems) {
    // Initialize with sample data
    localStorage.setItem("lostFoundItems", JSON.stringify(sampleItems))
    return sampleItems
  }

  return JSON.parse(storedItems)
}

// Add a new item
export function addItem(item: Omit<Item, "id" | "createdAt">): Item {
  const items = getItems()
  const newId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1

  const newItem: Item = {
    ...item,
    id: newId,
    createdAt: new Date().toISOString(),
  }

  const updatedItems = [...items, newItem]
  localStorage.setItem("lostFoundItems", JSON.stringify(updatedItems))

  return newItem
}

// Get a single item by ID
export function getItemById(id: number): Item | undefined {
  const items = getItems()
  return items.find((item) => item.id === id)
}

// Sort items by date (newest first)
export function getSortedItems(): Item[] {
  const items = getItems()
  return [...items].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

