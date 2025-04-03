"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { MapPin, PlusCircle, Search } from "lucide-react"
import { getSortedItems, type Item } from "@/store/items"

export default function Home() {
  const [items, setItems] = useState<Item[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Load items on the client side
    setItems(getSortedItems())
  }, [])

  // Filter items based on search term
  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Lost & Found</h1>
        <p className="text-muted-foreground">Find what you've lost or help others find their belongings</p>
      </header>

      <div className="mb-6">
        <Link href="/report" className="w-full">
          <Button variant="default" size="lg" className="w-full h-16 text-lg">
            <PlusCircle className="mr-2 h-5 w-5" />
            Report Item
          </Button>
        </Link>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          className="pl-10"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 w-full mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="lost">Lost</TabsTrigger>
          <TabsTrigger value="found">Found</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ItemsList items={filteredItems} />
        </TabsContent>

        <TabsContent value="lost">
          <ItemsList items={filteredItems.filter((item) => item.type === "lost")} />
        </TabsContent>

        <TabsContent value="found">
          <ItemsList items={filteredItems.filter((item) => item.type === "found")} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ItemsList({ items }: { items: Item[] }) {
  if (items.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No items to display</div>
  }

  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <Link href={`/items/${item.id}`} key={item.id}>
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${item.type === "lost" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
                    >
                      {item.type === "lost" ? "Lost" : "Found"}
                    </span>
                    <span className="text-muted-foreground text-sm">{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-medium mt-1">{item.title}</h3>
                  <div className="flex items-center text-muted-foreground text-sm mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {item.location}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

