import { Layout } from "@/components/Layout"
import { MessageItem } from "@/components/MessageItem"

export default function Home() {
    return (
        <Layout>
            <div className="flex w-full h-full">
                <div className="w-md max-w-base bg-white rounded-lg mx-auto p-3 md:p-8">
                    <ul className="overflow-y-auto h-full flex flex-col gap-3 md:gap-5">
                        <MessageItem
                            isMine={true}
                            name="test"
                            message="Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test"
                        />
                        <MessageItem
                            isMine={false}
                            name="test"
                            message="Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test"
                        />
                    </ul>
                </div>
                <div className="fixed bottom-0 left-0 right-0 ">
                    <form className="flex">
                        <input className="w-24 text-sm md:text-base md:w-80 border border-black p-2 font-medium" type="text" placeholder="your name" />
                        <input className="flex-1 border border-black text-lg p-2 font-medium" placeholder="enter message" type="text" />
                        <input className="bg-emerald-600 text-white border border-black px-2 md:px-8 hover:opacity-80 transition-opacity cursor-pointer" type="submit" />
                    </form>
                </div>
            </div>
        </Layout>
    )
}
