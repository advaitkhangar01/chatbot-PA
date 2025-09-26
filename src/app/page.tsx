import ChatWindow from '@/components/chat/ChatWindow';

export default function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-3xl">
        <ChatWindow />
      </div>
    </main>
  );
}
