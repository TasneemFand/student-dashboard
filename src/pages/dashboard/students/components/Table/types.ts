export type TStudent = {
    id: string;
    firstName?: string;
    lastName?: string;
    birthDate: string;
    grade: {
        id: string;
        translations?: {
            name: string;
            cultureCode: number[]
        }[]
    };
    gender: {
        id: string;
        translations?: {
            name: string;
            cultureCode: number[]
        }[]
    };
    country?: string;
    phone?: string;
    remarks?: string

}

export type TMappedStudent = {
    id: string;
    firstName?: string;
    lastName?: string;
    birthDate: string;
    grade: string;
    gender: string;
    country?: string;
    phone?: string;
    remarks?: string

}