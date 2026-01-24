import { Composer } from './types';

const API_URL = 'http://localhost:8000/api';

export const api = {
    getComposers: async (): Promise<Composer[]> => {
        const response = await fetch(`${API_URL}/composers`);
        if (!response.ok) throw new Error('Failed to fetch composers');
        return response.json();
    },

    getComposer: async (id: string): Promise<Composer> => {
        const response = await fetch(`${API_URL}/composers/${id}`);
        if (!response.ok) throw new Error('Failed to fetch composer');
        return response.json();
    },

    createComposer: async (composer: { name: string; period: string; image: string }): Promise<Composer> => {
        const response = await fetch(`${API_URL}/composers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(composer),
        });
        if (!response.ok) throw new Error('Failed to create composer');
        return response.json();
    },

    updateComposer: async (id: string, composer: Partial<Composer>): Promise<Composer> => {
        const response = await fetch(`${API_URL}/composers/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(composer),
        });
        if (!response.ok) throw new Error('Failed to update composer');
        return response.json();
    },

    deleteComposer: async (id: string): Promise<void> => {
        const response = await fetch(`${API_URL}/composers/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete composer');
    },

    // Works
    createWork: async (work: any): Promise<any> => {
        const response = await fetch(`${API_URL}/works`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(work),
        });
        if (!response.ok) throw new Error('Failed to create work');
        return response.json();
    },

    updateWork: async (id: string, work: any): Promise<any> => {
        const response = await fetch(`${API_URL}/works/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(work),
        });
        if (!response.ok) throw new Error('Failed to update work');
        return response.json();
    },

    deleteWork: async (id: string): Promise<void> => {
        const response = await fetch(`${API_URL}/works/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete work');
    },

    // Recordings
    createRecording: async (recording: any): Promise<any> => {
        const response = await fetch(`${API_URL}/recordings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recording),
        });
        if (!response.ok) throw new Error('Failed to create recording');
        return response.json();
    },

    updateRecording: async (id: string, recording: any): Promise<any> => {
        const response = await fetch(`${API_URL}/recordings/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recording),
        });
        if (!response.ok) throw new Error('Failed to update recording');
        return response.json();
    },

    deleteRecording: async (id: string): Promise<void> => {
        const response = await fetch(`${API_URL}/recordings/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete recording');
    },
};
