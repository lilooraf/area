export function removeChar(str, char)
{
    let clean_str = ''

    for (let i = 0; i != str.length; i++) {
        if (str[i] === char)
            continue
        clean_str += str[i]
    }
    return clean_str
}