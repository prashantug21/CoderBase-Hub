import Link from "next/link"
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton
} from "@clerk/nextjs"
const Navbar = () => {
    return (
        <div className={"flex justify-between items-center p-4 w-full border-b static top-0 bg-white z-50"}>
            <div className="flex gap-2 justify-start items-center">
                <Link href={"/"} className={"text-2xl font-bold"}>CoderHub</Link>
                {/* <Link href={"/"} className={""}>Contests</Link> */}
            </div>
            <div className="flex gap-2 justify-end items-center text-sm">
                <SignedOut>
                    <SignInButton >
                        <div className="sign-in">
                            <button>
                                <span className="button_top"> Sign In </span>
                            </button>
                        </div>
                    </SignInButton>
                    <SignUpButton >
                        <div className="sign-up">
                            <button>
                                <span className="button_top"> Sign up </span>
                            </button>
                        </div>
                    </SignUpButton >
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}

export default Navbar
