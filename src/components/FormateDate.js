export default function formatDate(dateString) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options); // 'en-GB' is used for formatting like "19 Aug, 2024"
};
