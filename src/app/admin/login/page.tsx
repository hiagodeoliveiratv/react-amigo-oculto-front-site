"use client"

import { Button } from "@/components/admin/Button";
import { InputField } from "@/components/admin/InputField";
import { useState } from "react";
import * as api from '@/api/admin';
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";


const Page = () => {

    const router = useRouter();

    const [ passwordInput, setPasswordInput ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');

    const handleLoginClick = async () => {

        if(passwordInput) {
            setError('');
            setLoading(true);

            const token = await api.login(passwordInput);

            setLoading(false);

            if(token){
                // Salva o token 
                setCookie('token', token);
                router.push('/admin');

            } else {
                setError('Acesso negado!');
            }

        }


    }

    return (
        <div>        
            <p className="text-center">Qual a senha secreta?</p>

            <InputField
                type="password"
                value={passwordInput}
                onChange={e=>setPasswordInput(e.target.value)}
                placeholder="Digite a senha"
                disabled={loading}
               
            />
            <Button
                value={loading?`Carregando`: 'Entrar'}
                onClick={handleLoginClick}
                disabled={loading}
            />

            {error &&
                <div className="border-dashed border-2 p-2 border-gray-400  text-center rounded">
                    {error}
                </div>
            }

       
        </div>
    )
}

export default Page;