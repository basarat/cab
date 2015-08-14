export var errorCodes = {
    success: 0,
    unknownError: 1,
    couldNotListen: 2,
}

export function exit(code = errorCodes.success){
    process.exit(errorco);
}