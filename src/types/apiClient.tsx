export type clientType = 'regualar' | 'anonimous' | 'password' | 'token';
export type returnType<T> = Promise<{ data: T | undefined; error: string }>;
