"use client"

import { z } from "zod";
import { Button } from "../Button";
import { InputField } from "../InputField";
import { useState } from "react";
import { ErrorItem, getErrorsFromZod } from "@/utils/getErrorsFromZod";
import * as api from '@/api/admin';

type Props = {
    refreshAction: () => void;
}

export const EventAdd = ( { refreshAction } : Props ) => {

    const [ titleField, setTitleField ] = useState('');
    const [ descriptionField, setDescriptionField ] = useState('');
    const [ groupedField, setGroupedField ] = useState(false);
    const [ errors, setErrors ] = useState<ErrorItem[]>([]);
    const [ loading, setLoading ] = useState(false);

    const eventSchema = z.object({
        titleField: z.string().min(1, 'Preencha o título'),
        descriptionField: z.string().min(1, 'Preencha a descrição'),
        groupedField: z.boolean()
    });

    const handleAddButton = async () => {

        setErrors([]);

        const data = eventSchema.safeParse( { titleField, descriptionField, groupedField});
        if(!data.success) return setErrors(getErrorsFromZod(data.error));

        setLoading(true);

        const eventItem = await api.addEvent({
            title: data.data.titleField,
            description: data.data.descriptionField,
            grouped: data.data.groupedField
        });

        setLoading(false);

        if(eventItem) refreshAction();
        
    }


    return (
        <div>
            <div className="mb-5">
                <label htmlFor="">Título</label>
                <InputField
                    value={titleField}
                    onChange={e => setTitleField(e.target.value)}
                    placeholder="Digite o título do evento"
                    errorMessage={errors.find(item => item.field === 'titleField')?.message}
                    disabled={loading}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="">Descrição</label>
                <InputField
                    value={descriptionField}
                    onChange={e => setDescriptionField(e.target.value)}
                    placeholder="Digite a descrição do evento"
                    errorMessage={errors.find(item => item.field === 'descriptionField')?.message}
                    disabled={loading}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="">Agrupar sorteio?</label>

                <input 
                    type="checkbox"
                    checked={groupedField}
                    onChange={e => setGroupedField(!groupedField)}
                    className="block h-5 w-5 mt-3"
                    disabled={loading}
                    
                />
            </div>
            <div>
                <Button
                    value={loading ? 'Adicionando': 'Adicionar'}
                    onClick={handleAddButton}
                    disabled={loading}
                
                />
            </div>
        </div>
    )
}