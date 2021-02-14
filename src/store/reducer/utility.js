export const updatedOject = (oldObject, updatedProperty) => {
    return {
        ...oldObject,
        ...updatedProperty
    }
}