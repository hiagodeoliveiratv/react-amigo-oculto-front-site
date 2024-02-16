import * as api from '@/api/site';
import { Search } from '@/components/site/Search';
import { redirect } from 'next/navigation';

type Props = {
    params: {
        id: string; // Parâmetros, sempre vem em string
    }
}

// O async só funciona em componentes server side
const Page =  async ( { params } : Props )=> {

    const eventitem = await api.getEvent(+params.id);

    if(!eventitem || !eventitem.status) return redirect('/');

    return (
        <main className="text-center mx-auto max-w-lg p-5 ">
            
            <header>
                <h2 className="text-2xl text-yellow-400">Amigo Oculto</h2>
                <h1 className="text-3xl mt-5 mb-2">{eventitem.title}</h1>
                <p className="text-sm mb-5">{eventitem.description}</p>
            </header>

            <Search id={+params.id} />

            <footer>
                <p className="mt-5 text-sm">Criado com 😍 pela H7Mídia</p>
            </footer>

        </main>
    )
}

export default Page;