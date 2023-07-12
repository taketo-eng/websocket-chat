import React, { FC, ReactNode } from "react"
import { Header } from "../Header"

type Props = {
    children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
    return (
        <>
            <Header />
            <main className="bg-slate-900 pt-20 h-screen pb-20">{children}</main>
        </>
    )
}
