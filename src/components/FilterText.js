function escapeLatexChars(text) {
    if (!text || typeof text !== 'string') return text;

    const replacements = {
        '\\': '\\textbackslash{}',
        '{': '\\{',
        '}': '\\}',
        '%': '\\%',
        '$': '\\$',
        '&': '\\&',
        '#': '\\#',
        '_': '\\_',
        '^': '\\^{}',
        '~': '\\~{}'
    };

    return text.replace(/[\\{}%$&#_^~]/g, match => replacements[match]);
}

export function sanitizeData(data) {
    if (typeof data === 'string') {
        return escapeLatexChars(data);
    } else if (Array.isArray(data)) {
        return data.map(sanitizeData);
    } else if (typeof data === 'object' && data !== null) {
        const sanitizedObj = {};
        for (const key in data) {
            sanitizedObj[key] = sanitizeData(data[key]);
        }
        return sanitizedObj;
    }
    return data;
}
