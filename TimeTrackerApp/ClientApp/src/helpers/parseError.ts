export const parseError = (error: string): string => {
    return error.replaceAll("GraphQL.ExecutionError: ", "");
}