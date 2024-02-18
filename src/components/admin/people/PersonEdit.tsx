import { PersonComplete } from "@/types/PersonComplete";
import * as api from '@/api/admin';
import { z } from "zod";
import { useState } from "react";
import { InputField } from "../InputField";
import { Button } from "../Button";
import { getErrorsFromZod } from "@/utils/getErrorsFromZod";
import { ErrorItem } from "@/utils/getErrorsFromZod";
import { scapeCPF } from "@/utils/scapeCPF";

type Props = {
    person: PersonComplete;
    refreshAction: () => void;
}


export const PersonEdit = ( { person, refreshAction} : Props) => {

    const [ nameField, setNamefield ] = useState(person.name);
    const [ cpfField, setCpfField ] = useState(person.cpf);
    const [ errors, setErrors ] = useState<ErrorItem[]>([]);
    const [ loading , setLoading ] = useState(false);

    const personSchema = z.object({
        nameField: z.string().min(1, 'Preencha o nome'),
        cpfField: z.string().length(11, 'CPF inválido')
    });

    const handleSaveButton = async ()=> {

        const data = personSchema.safeParse({nameField, cpfField});
        if(!data.success) return setErrors(getErrorsFromZod(data.error));

        if(errors.length > 0) return;

        setLoading(true);

        const personItem = await api.editPerson(person.id_event, person.id_group, person.id, {
            name: nameField, 
            cpf: cpfField
        });
        
        setLoading(false);

        if(personItem){
            setNamefield('');
            setCpfField('');
            refreshAction();

        } else {
            alert("Ocorreu um erro ao atualizar a pessoa.");
        }


    }


    return (
        <div>
            <h4 className="text-xl">Editar Pessoa</h4>
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

            <div className="flex gap-3">

                <Button
                    value="Cancelar"
                    onClick={()=> refreshAction()}
                
                />

                <Button
                    value={loading? 'Atualizando': 'Atualizar'}
                    onClick={handleSaveButton}
                    disabled={loading}
                />
               
            </div>
        </div>
    );
}