import { ErrorItem, getErrorsFromZod } from "@/utils/getErrorsFromZod";
import * as api from '@/api/admin';
import { useState } from "react";
import { InputField } from "../InputField";
import { scapeCPF } from "@/utils/scapeCPF";
import { Button } from "../Button";
import { z } from "zod";


type Props = {
    eventId: number;
    selectedGroupId: number;
    refreshAction: () => void;
}

export const PersonAdd = ( { eventId, selectedGroupId, refreshAction } : Props) => {

    const [ nameField, setNamefield ] = useState('');
    const [ cpfField, setCpfField ] = useState('');
    const [ errors, setErrors ] = useState<ErrorItem[]>([]);
    const [ loading , setLoading ] = useState(false);

    const personSchema = z.object({
        nameField: z.string().min(1, 'Preencha o nome'),
        cpfField: z.string().length(11, 'CPF inválido')
    });
    const handleSaveButton = async () => {
        setErrors([]);
        const data = personSchema.safeParse({nameField, cpfField});
        if(!data.success) return setErrors(getErrorsFromZod(data.error));

        setLoading(true);

        const personItem = await api.addPerson(eventId, selectedGroupId, {
            name: data.data.nameField,
            cpf: data.data.cpfField
        });
        setLoading(false);

        if(personItem){
            setNamefield('')
            setCpfField('')
            refreshAction();

        }else {
            alert("Ocorreu um erro ao adicionar a pessoa.");
        }

    }

    return (
        <div>
            <h4 className="text-xl">Nova Pessoa</h4>
            <InputField
                value={nameField}
                onChange={e=>setNamefield(e.target.value)}
                placeholder="Digite o nome da pessoa"
                errorMessage={errors.find(item=>item.field === "nameField")?.message}
                disabled={loading}
            
            />

            <InputField
                value={cpfField}
                onChange={e=>setCpfField(scapeCPF(e.target.value))}
                placeholder="Digite o CPF da pessoa"
                errorMessage={errors.find(item=>item.field === "cpfField")?.message}
                disabled={loading}
            
            />

            <div>
                <Button
                    value={loading? 'Adicionando': 'Adicionar'}
                    onClick={handleSaveButton}
                    disabled={loading}
                />
            </div>
        </div>
    );
}