export type BaseApiParameter<T> = {
    isLoading: boolean;
    data: T;
    error: string;
};
