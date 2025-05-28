
export default function Home() {

    return (
        <div
            className="py-20 px-4 flex flex-col gap-4 min-h-screen font-[family-name:var(--font-geist-sans)]">
            <h1 className={`text-xl/2`}>Welcome to the Market Helper</h1>
            <p className={`text-neutral-500`}>
                We&apos;re so happy to have you here!
                We&apos;re working on a helpful app for the market that lets you track your deals in real time, including your profits and losses.

                We&apos;ll keep you in the loop with more updates, and we&apos;re always here for any questions or concerns you might have.
            </p>
        </div>
    );
}
