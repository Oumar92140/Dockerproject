import MessageForm from '../components/MessageForm';

async function getMessages() {
  // Appel direct au service "back" dans le réseau Docker
  const res = await fetch('http://backend:3000/api/messages', { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const messages = await getMessages();

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-black text-white p-3 rounded-xl font-bold italic">Nxt</div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">DOCKER_FEED</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Composant Client pour le formulaire */}
          <div className="md:col-span-1">
            <MessageForm />
          </div>

          {/* Liste des messages */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dernières entrées</h2>
            {messages.reverse().map((msg, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
                <p className="font-bold text-blue-600 mb-1">@{msg.author}</p>
                <p className="text-slate-700 leading-relaxed">{msg.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );

}
