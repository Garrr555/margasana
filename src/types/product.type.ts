export type Product = {
    status: string;
    id: string;
    name: string;
    price?: number;
    income?: string;
    category: string;
    image: string;
    age?: string;
    description?: string;
    date?: Date;
    created_at: Date;
    updated_at: Date;
    nik?: number;
    kk?: number;
    religion?: string;
    martial?: string;
    job?: string;
    rt?: number;
    rw?: number;
    education?: string;
    family?: string;
    stock?: [
        {
            size: string;
            qty: number;
        },
    ]
}