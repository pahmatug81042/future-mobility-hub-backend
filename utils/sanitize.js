import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

export const sanitizeInput = (input) => {
    if (typeof input === 'string') return DOMPurify.sanitize(input);
    return input;
};