import Link from "next/link";

export default function Test(){
    return(<main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Link href={"/"}>
        <button>Hello</button>
        </Link>
    </main>)
}