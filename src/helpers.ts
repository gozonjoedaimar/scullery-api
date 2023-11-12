export const ob_null = function(ob: Object) {
    if (Object.keys(ob).length === 0) {
        return null;
    }
    return ob;
}