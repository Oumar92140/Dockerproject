'use client';
import { useRouter } from 'next/navigation';

export default function MessageForm() {
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    await fetch('http://localhost:3000/api/messages', 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        author: formData.get('author'),
        content: formData.get('content'),
      }),
    });

    e.target.reset();
    router.refresh(); 
  }

  return (
    <form onSubmit={handleSubmit} class="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 sticky top-6">
      <div class="space-y-4">
        <input name="author" placeholder="Pseudo" required class="w-full bg-slate-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
        <textarea name="content" placeholder="Message..." required class="w-full bg-slate-50 border-none p-4 rounded-xl h-32 focus:ring-2 focus:ring-blue-500 outline-none" />
        <button type="submit" class="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition-all duration-300 shadow-lg">
          PUBLIER
        </button>
      </div>
    </form>
  );

}
