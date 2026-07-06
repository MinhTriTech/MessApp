export const fetchMessages = async (conversationId) => {
    const res = await fetch(`http://localhost:8000/messages/${conversationId}`);
    return res.json();
};