export interface Clients {
    id: string;
    name: string;
    balance: number;
    userTypeId: 'owner' | 'client';
}