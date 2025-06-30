type weightEntry = {
    date: string;
    weight: number;
};

type User = {
    id?: string; // reserved for firestore id
    email: string;
    username: string;
    height?: number;
    weight?: number;
    goal?: string;
    weightHistory?: weightEntry[];
    avatar?: string;
};

export default User;