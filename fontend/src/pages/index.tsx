import { Layout } from "@/components/Layout"
import { MessageItem } from "@/components/MessageItem"
import { SystemMessageItem } from "@/components/SystemMessageItem"
import { Message } from "@/types/Message"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"

const wsUrl = "ws://localhost:8000/ws/"

export default function Home() {
    const [userName, setUserName] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [messages, setMessages] = useState<Message[]>([])
    const socketRef = useRef<WebSocket>()

    useEffect(() => {
        const name = window.prompt("Enter your name") as string
        setUserName(name)

        socketRef.current = new WebSocket(wsUrl)
        socketRef.current.onopen = () => {
            console.log("connected")
            if (socketRef.current) {
                socketRef.current.send(
                    JSON.stringify({
                        message: `${name} enter room!`,
                    })
                )
            }
        }

        socketRef.current.onmessage = (e) => {
            const data = JSON.parse(e.data)
            setMessages((prevData) => [...prevData, data])
        }

        socketRef.current.onclose = () => {
            socketRef.current = new WebSocket(wsUrl)
        }

        return () => {
            if (!socketRef.current) return

            socketRef.current.close()
        }
    }, [])

    useEffect(() => {
        const scrollInner = document.querySelector(".message_wrapper") as Element
        scrollInner.scrollTop = scrollInner?.scrollHeight
    }, [messages])

    const sendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!socketRef.current || !message) return
        setMessage("")
        socketRef.current.send(
            JSON.stringify({
                name: userName,
                message,
            })
        )
    }

    return (
        <Layout>
            <div className="flex w-full h-full">
                <div className="w-md max-w-base bg-white rounded-lg mx-auto p-3 md:p-8">
                    <ul className="overflow-y-auto h-full flex flex-col gap-3 md:gap-5 message_wrapper">
                        {messages &&
                            messages.map((msgItem, i) => {
                                if (msgItem.name) {
                                    return <MessageItem key={i} name={msgItem.name} message={msgItem.message} isMine={msgItem.name == userName} />
                                } else {
                                    return <SystemMessageItem key={i} message={msgItem.message} />
                                }
                            })}
                    </ul>
                </div>
                <div className="fixed bottom-0 left-0 right-0 ">
                    <form onSubmit={(e) => sendMessage(e)} className="flex">
                        {/* <input className="w-24 text-sm md:text-base md:w-80 border border-black p-2 font-medium" type="text" placeholder="your name" /> */}
                        <input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                            className="flex-1 border border-black text-lg p-2 font-medium"
                            placeholder="enter message"
                            type="text"
                            value={message}
                        />
                        <input
                            disabled={!message}
                            className={`${message ? "bg-emerald-600 hover:opacity-80 transition-opacity" : "bg-gray-500"} text-white border border-black px-2 md:px-8 cursor-pointer`}
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    )
}
