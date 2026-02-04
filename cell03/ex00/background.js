function Clickchangecolorrandom() {
    const characters = '0123456789ABCDEF';
    let color = '#';

    for (let i =0; i < 6; i++) {
        color += characters[Math.floor(Math.random() * 16)];
    }

    document.body.style.backgroundColor = color;
}