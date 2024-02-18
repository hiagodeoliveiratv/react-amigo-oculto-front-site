import { req } from '../api/axios';
import { getCookie } from 'cookies-next';
import { Event } from '@/types/Event';
import { Group } from '@/types/Group';
import { PersonComplete } from '@/types/PersonComplete';

export const login = async (password: string) => {
    
    try {
        const json = await req.post('/admin/login', { password});
        return json.data.token as string ?? false;

    } catch(err) {
        return false;
    }
}

// EVENTS

export const getEvents = async () => {

    const token = getCookie('token');

    const json = await req.get('/admin/events', {
        headers: {
            'Authorization': `Token ${token}`
        }
    });

    return json.data.events as Event[] ?? [];
}

// ADD EVENT

type AddEventData = {
    title: string;
    description: string;
    grouped: boolean;
}
export const addEvent = async (data: AddEventData) : Promise<Event| false> => {

    const token = getCookie('token');
    const json = await req.post('/admin/events', data, {
        headers: {
            'Authorization': `Token ${token}`
        }
    });

    return json.data.event as  Event ?? false;
}


// DELETE EVENT 

export const deleteEvent = async (id: number ) => {
    const token = getCookie('token');
    const json = await req.delete(`/admin/events/${id}`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    });

    return !json.data.error;
}


// Atualizar Evento
type UpdateEventData = {
    title?: string;
    description?: string;
    grouped?: boolean;
    status?: boolean;
}
export const updateEvent = async (id: number, data: UpdateEventData): Promise<Event | false> => {

    const token = getCookie('token');
    const json = await req.put(`/admin/events/${id}`, data, {
        headers: {
            'Authorization': `Token ${token}`
        }
    });

    return json.data.event as  Event ?? false;
}

// GROUPS 

export const getGroups = async (eventId: number)  => {
    const token = getCookie('token');
    const json  = await req.get(`/admin/events/${eventId}/groups`, {
        headers: {
            'Authorization': `Token ${token}`,
        }
    });

    return json.data.groups as  Group[] ?? [];
}

type AddGroupData = {
    name: string;
}
export const addGroup = async (eventId: number, data: AddGroupData) : Promise<Group | false>=> {

    const token = getCookie('token');
    const json = await req.post(`/admin/events/${eventId}/groups`, data, {
        headers: {
            'Authorization': `Token ${token}`
        }
    });

    return json.data.group as Group ?? false;
}


type UpdateGroupData = {
    name: string; 
}

export const updateGroup = async (eventId: number, id: number, data: UpdateGroupData) : Promise<Group|false> => {

    const token = getCookie('token');
    const json = await req.put(`/admin/events/${eventId}/groups/${id}`, data, {
        headers: {
            Authorization: `Token ${token}`
        }
    });

    return json.data.group as Group ?? false;
}


export const deleteGroup = async ( eventId: number, id: number) => {
    const token = getCookie('token');
    const json = await req.delete(`/admin/events/${eventId}/groups/${id}`, {
        headers: {
            Authorization: `Token ${token}`
        }
    });

    return !json.data.error;
}

// PEOPLE 

export const getPeople = async ( eventId: number, groupId: number ) => {
    const token = getCookie('token');

    const json = await req.get(`/admin/events/${eventId}/groups/${groupId}/people`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    });

    return json.data.people as PersonComplete[] ?? [];
}

type AddPersonData = {
    name: string;
    cpf: string;
}
export const addPerson = async ( eventId: number, groupId: number, data: AddPersonData) => {

    const token = getCookie('token');
    const json = await req.post(`/admin/events/${eventId}/groups/${groupId}/people`, data, {
        headers: {
            'Authorization': `Token ${token}`
        }
    });

    return json.data.person as PersonComplete ?? false;
}

type EditPersonData = {
    name?: string;
    cpf?: string;
}

export const editPerson = async ( eventId: number, groupId: number, id: number, data: EditPersonData) => {

    const token = getCookie('token');
    const json = await req.put(`/admin/events/${eventId}/groups/${groupId}/people/${id}`, data, {
        headers: {
            'Authorization': `Token ${token}`
        }
    });

    return json.data.person as PersonComplete ?? false;
}


export const deletePerson = async ( eventId: number, groudId: number, id: number) => {
    const token = getCookie('token');
    const json = await req.delete(`/admin/events/${eventId}/groups/${id}/people/${id}`, {
        headers: {
            Authorization: `Token ${token}`
        }
    });

    return !json.data.error;
}