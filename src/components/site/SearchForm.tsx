import { scapeCPF } from "@/utils/scapeCPF";
import { useState } from "react";

type Props = {
    onSearchButton: ( cpf: string ) => void;
    loading: boolean;
}

export const SearchForm = ( { onSearchButton, loading} : Props ) => {

    const [ cpfInput, setCpfInput ] = useState('');

    return (
        <div className="">
            <p className="mb-3 text-xl">Qual o seu CPF?</p>
            <input 
                type="text"
                inputMode="numeric"
                placeholder="Digite seu CPF"
                className="w-full bg-white text-black text-center p-2 rounded outline-none text-3xl  disabled:opacity-50"
                autoFocus
                value={cpfInput}
                onChange={e=> setCpfInput(scapeCPF(e.target.value))}
                disabled={loading}
            />

            <button
                className="w-full p-2 bg-blue-800 mt-3 rounded border-b-4 border-blue-700 active:border-0
                    disabled:opacity-50
                "
                onClick={()=>  onSearchButton(cpfInput)}
                disabled={loading}

            >
                {loading && 'Buscando...'}
                {!loading && 'Descobrir'}
            </button>
        </div>
    );
}