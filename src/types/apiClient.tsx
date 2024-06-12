export type clientType = 'regualar' | 'anonymous' | 'password' | 'token';
export type returnType<T> = Promise<{ data: T | undefined; error: string }>;
