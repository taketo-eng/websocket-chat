export type Message = {
    name?: string
    message: string
    sendTime: Date
    messageType: "message" | "system"
}
