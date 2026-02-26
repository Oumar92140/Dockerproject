import MessageForm from '../components/MessageForm';

async function getMessages() {
  // Appel direct au service "back" dans le réseau Docker
  const res = await fetch('http://back:3000/messages', { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const messages = await getMessages();

  return (
    <main class="min-h-screen bg-slate-50 p-8">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center gap-4 mb-10">
          <div class="bg-black text-white p-3 rounded-xl font-bold italic">Nxt</div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tight">DOCKER_FEED</h1>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Composant Client pour le formulaire */}
          <div class="md:col-span-1">
            <MessageForm />
          </div>

          {/* Liste des messages */}
          <div class="md:col-span-2 space-y-4">
            <h2 class="text-xs font-bold text-slate-400 uppercase tracking-widest">Dernières entrées</h2>
            {messages.reverse().map((msg, i) => (
              <div key={i} class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
                <p class="font-bold text-blue-600 mb-1">@{msg.author}</p>
                <p class="text-slate-700 leading-relaxed">{msg.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}