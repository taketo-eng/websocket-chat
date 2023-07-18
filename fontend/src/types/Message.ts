import { Language } from "./lLanguages"

export type Message = {
    name?: string
    message: string
    sendTime: Date
    messageType: "message" | "system"
}

export type MessageLangageSetting = {
    isTranslate: boolean
    toLang: Language
}
