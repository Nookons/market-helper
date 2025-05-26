import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function Profile() {
    const session = await getServerSession();

    if (!session) return null;

    return (
        <div className="min-h-screen p-6 sm:p-12 flex items-center justify-center font-[family-name:var(--font-geist-sans)]">
            <div className="grid sm:grid-cols-2 gap-10 bg-white shadow-xl rounded-3xl p-8 sm:p-12 w-full max-w-4xl">
                {/* Avatar */}
                <div className="flex items-center justify-center">
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                        <Image
                            className="rounded-full object-cover shadow-lg"
                            fill
                            alt="User profile picture"
                            src={session.user?.image || "/default-avatar.png"}
                        />
                    </div>
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center gap-4 text-gray-800">
                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold">Name:</h2>
                        <p className="text-base sm:text-lg">{session.user?.name}</p>
                    </div>
                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold">Email:</h2>
                        <p className="text-base sm:text-lg">{session.user?.email}</p>
                    </div>
                    <div>
                        <Link className={`bg-neutral-900 w-full p-2 rounded text-white hover:bg-neutral-800 transition`} href={`/profile/api`}>Set Up Api</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
