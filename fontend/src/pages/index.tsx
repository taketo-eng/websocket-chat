import { Layout } from "@/components/Layout"
import { MessageItem } from "@/components/MessageItem"
import { SystemMessageItem } from "@/components/SystemMessageItem"
import { Message } from "@/types/Message"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

let socket: WebSocket

export default function Home() {
    const [userName, setUserName] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        const name = window.prompt("Enter your name") as string
        setUserName(name)

        socket = new WebSocket((process.env.NEXT_PUBLIC_END_POINT as string) + "/" + name)
        socket.onopen = () => {
            console.log("connected")
            socket.send(
                JSON.stringify({
                    message: `${name} enter room!`,
                    sendTime: new Date(),
                    messageType: "system",
                })
            )
        }

        socket.onmessage = (e) => {
            const data = JSON.parse(e.data)
            setMessages((prevData) => [...prevData, { ...data, sendTime: new Date(data.sendTime) }])
        }

        socket.onclose = () => {
            socket = new WebSocket((process.env.NEXT_PUBLIC_END_POINT as string) + "/" + userName)
        }

        return () => {
            if (!socket) return

            socket.close()
        }
    }, [])

    useEffect(() => {
        const scrollInner = document.querySelector(".message_wrapper") as Element
        scrollInner.scrollTop = scrollInner?.scrollHeight
    }, [messages])

    const sendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!socket || !message) return
        setMessage("")
        socket.send(
            JSON.stringify({
                message,
                sendTime: new Date(),
                messageType: "message",
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
                                    return <MessageItem key={i} name={msgItem.name} sendTime={msgItem.sendTime} message={msgItem.message} isMine={msgItem.name == userName} />
                                } else {
                                    return <SystemMessageItem key={i} message={msgItem.message} sendTime={msgItem.sendTime} />
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
