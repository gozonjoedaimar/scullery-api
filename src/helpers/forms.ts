import { ZodError } from "zod"

export const format_error = (error: ZodError) => {
    const { _errors, ...info } = error.format();
    const errors = Object.entries<{_errors: string[]}>(info).map( ([key, data]) => [key, data?._errors] );
    return Object.fromEntries(errors);
}