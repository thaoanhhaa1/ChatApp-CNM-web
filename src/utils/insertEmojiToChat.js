const insertEmojiToChat = (emoji, chat, inputElement) => {
    const selectionStart = inputElement.selectionStart;
    const selectionEnd = inputElement.selectionEnd;

    let newSelectionStart = selectionStart;
    let newSelectionEnd = selectionEnd;

    let text = chat;
    let input = inputElement.value;
    let pattern = /@~~(.*?)~~@/gm;
    let match;
    let indexOf;
    while ((match = pattern.exec(text)) !== null) {
        const display = match[1].split('~~')[1];

        indexOf = input.indexOf(`@${display}`);

        if (indexOf === -1) break;

        if (indexOf < selectionStart)
            newSelectionEnd = newSelectionStart = newSelectionStart + match[0].length - `@${display}`.length;
        else if (indexOf < selectionEnd) newSelectionEnd += match[0].length - `@${display}`.length;
        else break;
    }

    const startChat = chat.substring(0, newSelectionStart);
    const endChat = chat.substring(newSelectionEnd);

    return startChat + emoji + endChat;
};

export default insertEmojiToChat;
